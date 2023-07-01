import React from 'react'

const Link = ({ className, href, children }) => {
  const preventReloadPage = (e) => {
    e.preventDefault()
    window.history.pushState({}, '', href)
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
