import { useState } from 'react'
import { fullUrl, thumbUrl } from '../lib/img'
import { useLightbox } from './Lightbox'

/**
 * A clickable photo that opens the full-screen viewer.
 * `set` is the list of photos the arrow keys will move through, `index` is this photo's place in it.
 */
export default function Photo({ image, set, index, className = '' }) {
  const { open } = useLightbox()
  const [src, setSrc] = useState(thumbUrl(image))
  const [broken, setBroken] = useState(false)

  const onError = () => {
    // No small preview? Use the full photo. Neither? Show a placeholder.
    if (src !== fullUrl(image.file)) setSrc(fullUrl(image.file))
    else setBroken(true)
  }

  return (
    <button
      type="button"
      className={`photo ${className}`}
      onClick={() => open(set, index)}
      aria-label={image.caption ? `View photo full screen: ${image.caption}` : 'View photo full screen'}
    >
      {broken ? (
        <span className="photo-missing">Photo coming soon</span>
      ) : (
        <img src={src} alt={image.caption || image.alt || ''} loading="lazy" onError={onError} />
      )}
      <span className="photo-zoom" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </span>
    </button>
  )
}
