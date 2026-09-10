export type Achievement = {
  id: string
  title: string
  kind: 'press' | 'award' | 'publication' | 'finalist'
  year: string
  body: string
  link?: string
  linkLabel?: string
}

export const achievements: Achievement[] = [
  {
    id: 'chronicle',
    title: 'Featured by the Cook County Chronicle for U-PASS+',
    kind: 'press',
    year: '2024',
    body:
      'Led development of the U-PASS+ transit enrollment platform at UIC, giving 65,000+ students seamless CTA/Metra access. The program beat expectations, drew roughly $3M in funding for the university and was covered by the Cook County Chronicle.',
    link: 'https://chronicleillinois.com/news/cook-county-news/cta-metra-pass-for-uic-students-beats-expectations/',
    linkLabel: 'Read the article',
  },
  {
    id: 'epic',
    title: 'Winner — Epic × UIC Cosmos Hackathon',
    kind: 'award',
    year: '2024',
    body:
      'Won with a data-driven analysis of the correlation between hormone replacement therapy and breast cancer, using the Epic Cosmos dataset of 270M+ patient records.',
  },
  {
    id: 'incet',
    title: 'Published at INCET 2023',
    kind: 'publication',
    year: '2023',
    body:
      '"An Effective Counterfeit Medicine Authentication System Using Blockchain Technology and IoT to Prevent Hazards to Human Life" — 4th International Conference on Emerging Technology.',
  },
  {
    id: 'technocrats',
    title: 'Finalist — NMIT National-Level Hackathon (Team Technocrats)',
    kind: 'finalist',
    year: '2022',
    body:
      'Advanced through every round with "Unspoken Health", a mental-health-focused model built through continuous coding, research and solution design.',
  },
]
