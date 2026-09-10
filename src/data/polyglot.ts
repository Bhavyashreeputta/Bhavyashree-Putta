export type PolyglotSample = {
  lang: 'python' | 'java' | 'csharp'
  label: string
  file: string
  code: string
  notes: string[]
}

export const polyglotProblem = {
  title: 'One problem, three runtimes',
  description:
    'The same production problem I have solved at every job: consume an event stream with at-least-once delivery and guarantee exactly-once effects. Deduplicate with an atomic claim, retry transient failures with backoff, and park poison messages in a dead-letter queue instead of blocking the partition. Same design in each language — only the idioms change.',
}

export const polyglot: PolyglotSample[] = [
  {
    lang: 'python',
    label: 'Python',
    file: 'consumer.py',
    notes: [
      'asyncio + aiokafka; the Redis SET NX claim is the idempotency barrier.',
      'tenacity-style backoff is written inline so the retry policy is visible in the handler.',
      'Commit happens only after the effect — offsets never advance past unprocessed work.',
    ],
    code: `import asyncio, json, random
from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
from redis.asyncio import Redis

MAX_ATTEMPTS, BASE_DELAY = 5, 0.2

class ReleaseConsumer:
    def __init__(self, redis: Redis, producer: AIOKafkaProducer, notifier):
        self.redis, self.producer, self.notifier = redis, producer, notifier

    async def run(self) -> None:
        consumer = AIOKafkaConsumer("releases", group_id="notify",
                                    enable_auto_commit=False)
        await consumer.start()
        try:
            async for msg in consumer:
                await self.handle(json.loads(msg.value))
                await consumer.commit()          # commit AFTER the effect
        finally:
            await consumer.stop()

    async def handle(self, ev: dict) -> None:
        key = f"seen:{ev['id']}:{ev['subscriber_id']}"
        if not await self.redis.set(key, 1, nx=True, ex=7 * 86400):
            return                                # duplicate → no-op
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                await self.notifier.send(ev)
                return
            except TransientError:
                await asyncio.sleep(BASE_DELAY * 2 ** attempt
                                    + random.uniform(0, 0.1))
            except PermanentError:
                break
        await self.redis.delete(key)              # release the claim
        await self.producer.send("releases.DLT", json.dumps(ev).encode())`,
  },
  {
    lang: 'java',
    label: 'Java',
    file: 'ReleaseConsumer.java',
    notes: [
      'Spring Kafka with manual acks; @RetryableTopic gives non-blocking retries via retry topics and a DLT.',
      'Redis setIfAbsent is the claim; a transient failure releases it before rethrowing so the retry topic can re-claim.',
      'The DLT handler is a separate method — poison messages are visible, not swallowed.',
    ],
    code: `@Component
public class ReleaseConsumer {
    private final StringRedisTemplate redis;
    private final Notifier notifier;

    public ReleaseConsumer(StringRedisTemplate redis, Notifier notifier) {
        this.redis = redis; this.notifier = notifier;
    }

    @RetryableTopic(attempts = "5",
        backoff = @Backoff(delay = 200, multiplier = 2.0, random = true),
        dltTopicSuffix = ".DLT", include = TransientException.class)
    @KafkaListener(topics = "releases", groupId = "notify")
    public void onRelease(ReleaseEvent ev, Acknowledgment ack) {
        String key = "seen:" + ev.id() + ":" + ev.subscriberId();
        Boolean fresh = redis.opsForValue()
            .setIfAbsent(key, "1", Duration.ofDays(7));   // SET NX
        if (Boolean.FALSE.equals(fresh)) { ack.acknowledge(); return; }
        try {
            notifier.send(ev);
            ack.acknowledge();                              // ack AFTER effect
        } catch (TransientException e) {
            redis.delete(key);                              // release claim
            throw e;                                        // → retry topic
        }
    }

    @DltHandler
    public void onDeadLetter(ReleaseEvent ev,
            @Header(KafkaHeaders.EXCEPTION_MESSAGE) String why) {
        log.error("release {} parked in DLT: {}", ev.id(), why);
    }
}`,
  },
  {
    lang: 'csharp',
    label: 'C#',
    file: 'ReleaseConsumer.cs',
    notes: [
      'BackgroundService + Confluent.Kafka; Polly expresses the same backoff policy declaratively.',
      'StringSetAsync(When.NotExists) is the identical atomic claim on StackExchange.Redis.',
      'StoreOffset after the effect, DLT publish on exhaustion — same guarantees, C# idioms.',
    ],
    code: `public sealed class ReleaseConsumer : BackgroundService
{
    private readonly IConsumer<string, ReleaseEvent> _consumer;
    private readonly IProducer<string, ReleaseEvent> _producer;
    private readonly IDatabase _redis;
    private readonly INotifier _notifier;

    private static readonly AsyncRetryPolicy Retry = Policy
        .Handle<TransientException>()
        .WaitAndRetryAsync(5, attempt =>
            TimeSpan.FromMilliseconds(200 * Math.Pow(2, attempt))
            + TimeSpan.FromMilliseconds(Random.Shared.Next(0, 100)));

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        _consumer.Subscribe("releases");
        while (!ct.IsCancellationRequested)
        {
            var result = _consumer.Consume(ct);
            await HandleAsync(result.Message.Value, ct);
            _consumer.StoreOffset(result);              // offset AFTER effect
        }
    }

    private async Task HandleAsync(ReleaseEvent ev, CancellationToken ct)
    {
        var key = $"seen:{ev.Id}:{ev.SubscriberId}";
        var fresh = await _redis.StringSetAsync(key, "1",
            TimeSpan.FromDays(7), When.NotExists);     // SET NX
        if (!fresh) return;                            // duplicate → no-op
        try
        {
            await Retry.ExecuteAsync(() => _notifier.SendAsync(ev, ct));
        }
        catch (Exception)
        {
            await _redis.KeyDeleteAsync(key);          // release claim
            await _producer.ProduceAsync("releases.DLT",
                new Message<string, ReleaseEvent> { Key = ev.Id, Value = ev }, ct);
        }
    }
}`,
  },
]
