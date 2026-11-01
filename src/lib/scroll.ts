export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  // Move focus for keyboard / screen-reader users without scrolling again.
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

export function handleAnchorClick(e: React.MouseEvent<HTMLElement>, href: string) {
  if (!href.startsWith('#')) return
  e.preventDefault()
  scrollToId(href.slice(1))
  history.replaceState(null, '', href)
}

/** Ask the contact form to preselect a category / subject, then scroll to it. */
export function openContact(prefill?: { category?: string; subject?: string }) {
  window.dispatchEvent(new CustomEvent('hexa:prefill', { detail: prefill ?? {} }))
  scrollToId('contact')
}
