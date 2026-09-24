import { useState } from 'react'
import PageTitle from '../components/PageTitle'
import Photo from '../components/Photo'
import RichText from '../components/RichText'
import { litters, site } from '../lib/content'

export default function Litters() {
  const [activeId, setActiveId] = useState(litters[0]?.id)
  const litter = litters.find((l) => l.id === activeId) || litters[0]
  if (!litter) return <div className="container page"><h1>Litters</h1><p>No litters listed yet.</p></div>

  const gallery = [...(litter.photos || []), ...(litter.pedigrees || [])]
  const indexOf = (img) => gallery.indexOf(img)

  return (
    <div className="container page">
      <PageTitle title="Litters" />
      <h1>Litters</h1>

      <div className="tabs" role="tablist" aria-label="Litters">
        {litters.map((l) => (
          <button
            key={l.id}
            role="tab"
            aria-selected={l.id === litter.id}
            className={`tab ${l.id === litter.id ? 'active' : ''}`}
            onClick={() => setActiveId(l.id)}
          >
            {l.title}
          </button>
        ))}
      </div>

      <article key={litter.id} className="litter">
        <h2>{litter.subtitle}</h2>
        {litter.date && <p className="litter-date">{litter.date}</p>}
        <div className="prose">
          {litter.paragraphs?.map((p, i) => <p key={i}><RichText text={p} /></p>)}
        </div>

        {litter.photos?.length > 0 && (
          <div className="thumb-grid">
            {litter.photos.map((img) => (
              <figure key={img.file} className="thumb">
                <Photo image={img} set={gallery} index={indexOf(img)} />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        {litter.pedigrees?.length > 0 && (
          <section className="section">
            <h3>Pedigrees</h3>
            <div className="thumb-grid">
              {litter.pedigrees.map((img) => (
                <figure key={img.file} className="thumb thumb-wide">
                  <Photo image={img} set={gallery} index={indexOf(img)} />
                  {img.caption && <figcaption>{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        )}

        {litter.links?.length > 0 && (
          <ul className="link-list">
            {litter.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
              </li>
            ))}
          </ul>
        )}
      </article>

      {site.facebook && (
        <p className="follow">
          <a href={site.facebook} target="_blank" rel="noopener noreferrer">Follow us on Facebook</a>
        </p>
      )}
    </div>
  )
}
