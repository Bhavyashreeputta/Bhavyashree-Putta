import { Highlight, type Language, type PrismTheme } from 'prism-react-renderer'

// Theme driven entirely by CSS variables so it follows the IDE theme.
const theme: PrismTheme = {
  plain: { color: 'var(--fg)', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: 'var(--fg-faint)', fontStyle: 'italic' } },
    { types: ['punctuation'], style: { color: 'var(--fg-muted)' } },
    { types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'], style: { color: 'var(--orange)' } },
    { types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'], style: { color: 'var(--green)' } },
    { types: ['operator', 'entity', 'url'], style: { color: 'var(--cyan)' } },
    { types: ['atrule', 'attr-value', 'keyword'], style: { color: 'var(--accent-2)' } },
    { types: ['function', 'class-name', 'maybe-class-name'], style: { color: 'var(--accent)' } },
    { types: ['regex', 'important', 'variable'], style: { color: 'var(--yellow)' } },
    { types: ['annotation', 'decorator'], style: { color: 'var(--yellow)' } },
  ],
}

export function CodeBlock({
  code,
  language,
  startLine = 1,
  className = '',
}: {
  code: string
  language: Language | string
  startLine?: number
  className?: string
}) {
  return (
    <Highlight code={code.trimEnd()} language={language as Language} theme={theme}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className={`code-block overflow-x-auto ${className}`}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="ln">{startLine + i}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
