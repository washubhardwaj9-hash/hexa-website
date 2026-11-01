/**
 * Central site configuration.
 * Everything that depends on real-world data (launch date, contact service,
 * social profiles, product images) lives here so nothing is faked in the UI.
 */

const env = import.meta.env

export const SITE = {
  name: 'HEXA Technologies',
  product: 'HEXA AI',
  tagline: 'YOUR VOICE. YOUR WORLD.',

  /**
   * INTEGRATION POINT — Contact service.
   * Set VITE_CONTACT_ENDPOINT to any endpoint that accepts a JSON POST
   * ({ name, email, category, subject, message }). Without it the form validates
   * but honestly reports that no service is connected. See README.
   */
  contactEndpoint: (env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim() || '',
  contactEmail: (env.VITE_CONTACT_EMAIL as string | undefined)?.trim() || '',

  /**
   * INTEGRATION POINT — Launch date. ISO string. Empty = no countdown is shown.
   */
  launchDate: (env.VITE_LAUNCH_DATE as string | undefined)?.trim() || '',

  /** Social profiles. Empty URL = rendered as "coming soon" instead of a dead link. */
  socials: {
    instagram: (env.VITE_INSTAGRAM_URL as string | undefined)?.trim() || '',
    youtube: (env.VITE_YOUTUBE_URL as string | undefined)?.trim() || '',
    linkedin: (env.VITE_LINKEDIN_URL as string | undefined)?.trim() || '',
  },
} as const

/**
 * INTEGRATION POINT — Product imagery.
 * Drop your real product photos into /public/images/product/ using the file
 * names below (or change the paths). While a file is missing, the site shows a
 * clearly labelled placeholder — it never invents product details.
 */
const BASE = import.meta.env.BASE_URL
export const PRODUCT_IMAGES = {
  hero: BASE + 'images/product/hexa-ai-hero.png',
  front: BASE + 'images/product/hexa-ai-front.jpg',
  side: BASE + 'images/product/hexa-ai-side.jpg',
  led: BASE + 'images/product/hexa-ai-led-closeup.jpg',
  unboxing: BASE + 'images/product/hexa-ai-unboxing.jpg',
  accessories: BASE + 'images/product/hexa-ai-accessories.jpg',
} as const

export type NavItem = { label: string; href: string; id: string }

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'HEXA AI', href: '#hexa-ai', id: 'hexa-ai' },
  { label: 'Technology', href: '#technology', id: 'technology' },
  { label: 'Our Vision', href: '#vision', id: 'vision' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export const SECTION_IDS = ['home', 'hexa-ai', 'technology', 'vision', 'contact']

export type FeatureStatus = 'concept' | 'planned' | 'in-development'

export const STATUS_LABEL: Record<FeatureStatus, string> = {
  concept: 'Concept',
  planned: 'Coming soon',
  'in-development': 'In development',
}
