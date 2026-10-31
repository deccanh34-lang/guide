// Edit this file to rebrand or to add programs and topics.
export const SITE = {
  name: 'Partner Atlas',
  url: 'https://www.example.com', // TODO: your real domain
  publisher: '[Publisher name]',   // TODO: real publisher / business name
  email: '[contact email]',        // TODO: real contact email
}

// To add a topic: add a key here, then use it as `topic` in src/content.js.
export const TOPICS = {
  affiliate: { en: 'Affiliate marketing', es: 'Marketing de afiliados', vi: 'Tiếp thị liên kết' },
}

// type: marketplace | network | digital | saas   pays: sale | varies
// No rates, cookie windows or payouts are listed on purpose: they change, so link to official terms.
export const PROGRAMS = [
  { name: 'Amazon Associates', type: 'marketplace', pays: 'sale', url: 'https://affiliate-program.amazon.com' },
  { name: 'eBay Partner Network', type: 'marketplace', pays: 'sale', url: 'https://partnernetwork.ebay.com' },
  { name: 'Awin', type: 'network', pays: 'varies', url: 'https://www.awin.com' },
  { name: 'CJ Affiliate', type: 'network', pays: 'varies', url: 'https://www.cj.com' },
  { name: 'Rakuten Advertising', type: 'network', pays: 'varies', url: 'https://rakutenadvertising.com' },
  { name: 'Impact', type: 'network', pays: 'varies', url: 'https://impact.com' },
  { name: 'PartnerStack', type: 'saas', pays: 'varies', url: 'https://partnerstack.com' },
  { name: 'ClickBank', type: 'digital', pays: 'sale', url: 'https://www.clickbank.com' },
]
