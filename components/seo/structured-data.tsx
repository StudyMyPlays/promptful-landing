import { faqs, pricing } from '@/lib/content'
import { APP_URL, SITE_URL, links, seo } from '@/lib/site'

/** Organization, WebSite, product offers and FAQ as JSON-LD, built from the page's own content. */
const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: 'Promptful',
      alternateName: 'Be Promptful',
      url: SITE_URL,
      logo: `${SITE_URL}/apple-icon.png`,
      email: links.support.replace('mailto:', ''),
      sameAs: [APP_URL],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Promptful',
      url: SITE_URL,
      description: seo.description,
      publisher: { '@id': `${SITE_URL}/#org` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#app`,
      name: 'Promptful',
      url: APP_URL,
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web',
      description: seo.description,
      publisher: { '@id': `${SITE_URL}/#org` },
      offers: [
        { '@type': 'Offer', name: pricing.free.name, price: '0', priceCurrency: 'USD', url: links.signup },
        {
          '@type': 'Offer',
          name: pricing.pro.name,
          price: pricing.pro.price.replace('$', ''),
          priceCurrency: 'USD',
          url: links.pricing,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: pricing.pro.price.replace('$', ''),
            priceCurrency: 'USD',
            unitCode: 'MON',
          },
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: Object.values(faqs)
        .flat()
        .map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
}

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so no string in the content can close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
    />
  )
}
