import PageTitle from '../components/PageTitle'
import Photo from '../components/Photo'
import RichText from '../components/RichText'
import Videos from '../components/Videos'
import { Link } from '../lib/router'
import { dogs, fullName } from '../lib/content'
import NotFound from './NotFound'

export default function Dog({ slug }) {
  const dog = dogs.find((d) => d.slug === slug)
  if (!dog) return <NotFound />

  // One list drives the full-screen viewer, so arrow keys travel through every photo on this page.
  const gallery = [dog.photo, ...(dog.photos || []), dog.pedigree].filter(Boolean)
  const indexOf = (img) => gallery.indexOf(img)

  return (
    <div className="container page dog-page">
      <PageTitle title={dog.name} />
      <p className="crumbs">
        <Link to={dog.sex === 'male' ? '/male-dogs' : '/female-dogs'}>{dog.sex === 'male' ? 'Male Dogs' : 'Female Dogs'}</Link>
      </p>
      <h1>{fullName(dog)}</h1>
      {dog.memorial && <p className="memorial-badge">Forever in our hearts{dog.passed ? ` · ${dog.passed}` : ''}</p>}

      <div className="dog-intro">
        {dog.photo && (
          <div className="dog-main-photo">
            <Photo image={dog.photo} set={gallery} index={indexOf(dog.photo)} className="photo-large" />
          </div>
        )}
        <div className="dog-text prose">
          {dog.facts?.length > 0 && (
            <dl className="facts">
              {dog.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {dog.bio?.map((p, i) => <p key={i}><RichText text={p} /></p>)}
        </div>
      </div>

      {dog.photos?.length > 0 && (
        <section className="section">
          <h2>Photos</h2>
          <div className="thumb-grid">
            {dog.photos.map((img) => (
              <figure key={img.file} className="thumb">
                <Photo image={img} set={gallery} index={indexOf(img)} />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      <Videos videos={dog.videos} />

      {dog.pedigree && (
        <section className="section">
          <h2>Pedigree</h2>
          <div className="thumb-grid">
            <figure className="thumb thumb-wide">
              <Photo image={dog.pedigree} set={gallery} index={indexOf(dog.pedigree)} />
              {dog.pedigree.caption && <figcaption>{dog.pedigree.caption}</figcaption>}
            </figure>
          </div>
        </section>
      )}
    </div>
  )
}
