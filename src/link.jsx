import React from 'react'

const Link = ({ className, href, children }) => {
  const preventReloadPage = (e) => {
    e.preventDefault()
    /* `window.history.pushState({}, '', href)` is used to modify the browser's history state. It pushes
   a new state object onto the history stack, updates the URL to the specified `href`, and does not
   reload the page. This allows for updating the URL without triggering a full page reload, which is
   useful for creating single-page applications (SPAs) where the content is dynamically loaded
   without navigating to a new page. */
    window.history.pushState({}, '', href)
    /* The code `const navEvent = new PopStateEvent('popstate')` creates a new `PopStateEvent` object
   with the event type set to `'popstate'`. */
    const navEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navEvent)
  }
  return (
    <a className={className} onClick={preventReloadPage} href={href}>
      {children}
    </a>
  )
}

export default Link
