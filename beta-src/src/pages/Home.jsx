import PageTitle from '../components/PageTitle'
import RichText from '../components/RichText'
import DogCard from '../components/DogCard'
import { Link } from '../lib/router'
import { site, home, dogs } from '../lib/content'
import { fullUrl } from '../lib/img'

export default function Home() {
  const current = dogs.filter((d) => !d.memorial)
  return (
    <>
      <PageTitle />
      <section className="hero" style={{ backgroundImage: `url(${fullUrl(site.heroImage)})` }}>
        <div className="hero-overlay">
          <div className="container hero-inner">
            <h1>{site.name}</h1>
            <p className="hero-tagline">{site.tagline}</p>
            <div className="hero-actions">
              <Link to="/litters" className="btn">View Litters</Link>
              <Link to="/contact" className="btn btn-ghost">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {home.highlights?.length > 0 && (
          <ul className="highlights">
            {home.highlights.map((h) => (
              <li key={h.title}>
                <strong>{h.title}</strong>
                <span>{h.text}</span>
              </li>
            ))}
          </ul>
        )}

        <section className="section prose">
          <h2>{home.heading}</h2>
          {home.paragraphs.map((p, i) => (
            <p key={i}><RichText text={p} /></p>
          ))}
        </section>

        <section className="section">
          <h2>Meet Our Dogs</h2>
          <div className="card-grid">
            {current.map((d) => <DogCard key={d.slug} dog={d} />)}
          </div>
        </section>
      </div>
    </>
  )
}
