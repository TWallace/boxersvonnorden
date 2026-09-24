import { Link } from '../lib/router'
import { fullUrl, thumbUrl } from '../lib/img'
import { fullName } from '../lib/content'

export default function DogCard({ dog }) {
  const img = dog.photo
  return (
    <Link to={`/dogs/${dog.slug}`} className="dog-card">
      <span className="dog-card-img">
        {img && (
          <img
            src={thumbUrl(img)}
            alt={dog.name}
            loading="lazy"
            onError={(e) => {
              const full = fullUrl(img.file)
              if (e.currentTarget.src !== new URL(full, window.location.href).href) e.currentTarget.src = full
            }}
          />
        )}
      </span>
      <span className="dog-card-body">
        <span className="dog-card-name">{dog.name}</span>
        {dog.titles && <span className="dog-card-titles">{dog.titles}</span>}
      </span>
    </Link>
  )
}

export { fullName }
