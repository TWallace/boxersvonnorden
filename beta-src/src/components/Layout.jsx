import { useEffect, useState } from 'react'
import { Link, NavLink, usePath } from '../lib/router'
import { site, maleDogs, femaleDogs } from '../lib/content'

function DogMenu({ label, to, dogs }) {
  return (
    <li className="has-menu">
      <NavLink to={to} className="nav-link">
        {label}
        <svg className="caret" viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </NavLink>
      <ul className="menu">
        {dogs.map((d) => (
          <li key={d.slug}>
            <NavLink to={`/dogs/${d.slug}`}>{d.name}</NavLink>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default function Layout({ children }) {
  const path = usePath()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu after navigating.
  useEffect(() => setMenuOpen(false), [path])

  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }}>
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            {site.name}
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
              {menuOpen ? (
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
          <nav id="main-nav" className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main">
            <ul>
              <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
              <DogMenu label="Male Dogs" to="/male-dogs" dogs={maleDogs} />
              <DogMenu label="Female Dogs" to="/female-dogs" dogs={femaleDogs} />
              <li><NavLink to="/memory" className="nav-link">Forever in Memory</NavLink></li>
              <li><NavLink to="/litters" className="nav-link">Litters</NavLink></li>
              <li><NavLink to="/raw-feeding" className="nav-link">Raw Feeding</NavLink></li>
              <li><NavLink to="/gallery" className="nav-link">Gallery</NavLink></li>
              <li><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      <footer className="site-footer">
        <div className="container">
          <p className="footer-brand">{site.name}</p>
          <p>
            {site.owner} &middot; {site.location}
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {site.facebook && (
              <>
                {' '}&middot;{' '}
                <a href={site.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              </>
            )}
          </p>
          <p className="copyright">Copyright &copy; {new Date().getFullYear()} {site.name}. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  )
}
