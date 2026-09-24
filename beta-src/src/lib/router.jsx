import { createContext, useContext, useEffect, useState, useCallback } from 'react'

// A tiny hash-based router (addresses look like /#/dogs/indy).
// Hash addresses work on any web host with no server setup, and on refresh.
const RouterContext = createContext({ path: '/', navigate: () => {} })

const readPath = () => {
  const p = window.location.hash.replace(/^#/, '') || '/'
  return p.startsWith('/') ? p : '/' + p
}

export function Router({ children }) {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const onChange = () => {
      setPath(readPath())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = useCallback((to) => {
    window.location.hash = to
  }, [])

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

export const usePath = () => useContext(RouterContext).path

export function Link({ to, children, ...rest }) {
  return (
    <a href={`#${to}`} {...rest}>
      {children}
    </a>
  )
}

export function NavLink({ to, end = false, className = '', children, ...rest }) {
  const path = usePath()
  const active = end ? path === to : path === to || path.startsWith(to + '/')
  return (
    <a href={`#${to}`} className={`${className} ${active ? 'active' : ''}`.trim()} aria-current={active ? 'page' : undefined} {...rest}>
      {children}
    </a>
  )
}

// Match "/dogs/:slug" style patterns. Returns params object or null.
export function matchRoute(pattern, path) {
  const a = pattern.split('/').filter(Boolean)
  const b = path.split('/').filter(Boolean)
  if (a.length !== b.length) return null
  const params = {}
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(':')) params[a[i].slice(1)] = decodeURIComponent(b[i])
    else if (a[i] !== b[i]) return null
  }
  return params
}
