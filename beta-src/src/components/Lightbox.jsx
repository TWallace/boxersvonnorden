import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { fullUrl, thumbUrl } from '../lib/img'

const LightboxContext = createContext({ open: () => {} })

/** Call `const { open } = useLightbox()` then `open(images, startIndex)` to show the viewer. */
export const useLightbox = () => useContext(LightboxContext)

export function LightboxProvider({ children }) {
  const [state, setState] = useState(null) // { images, index }
  const opener = useRef(null)

  const open = useCallback((images, index = 0) => {
    if (!images?.length) return
    opener.current = document.activeElement
    setState({ images, index })
  }, [])

  const close = useCallback(() => {
    setState(null)
    // Give keyboard focus back to the photo that was clicked.
    setTimeout(() => opener.current?.focus?.(), 0)
  }, [])

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {state &&
        createPortal(
          <Viewer
            images={state.images}
            start={state.index}
            onClose={close}
          />,
          document.body,
        )}
    </LightboxContext.Provider>
  )
}

function Viewer({ images, start, onClose }) {
  const [index, setIndex] = useState(start)
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)
  const touchStart = useRef(null)
  const closeBtn = useRef(null)
  const count = images.length
  const image = images[index]

  const go = useCallback(
    (step) => {
      if (count < 2) return
      setIndex((i) => (i + step + count) % count)
    },
    [count],
  )

  // Reset load state whenever the picture changes.
  useEffect(() => {
    setFailed(false)
    setLoaded(false)
    setUsingFallback(false)
  }, [index])

  // Keyboard: left/right arrows change photo, Esc closes.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'Tab') {
        // Keep focus inside the viewer.
        e.preventDefault()
        closeBtn.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // Lock page scroll while open, and focus the close button.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Quietly preload the next and previous photos so arrow keys feel instant.
  useEffect(() => {
    if (count < 2) return
    ;[1, -1].forEach((step) => {
      const img = new Image()
      img.src = fullUrl(images[(index + step + count) % count].file)
    })
  }, [index, count, images])

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return
    const dx = e.changedTouches[0].clientX - touchStart.current
    touchStart.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  // If the full-size photo is missing, fall back to the small preview.
  const src = usingFallback ? thumbUrl(image) : fullUrl(image.file)
  const onError = () => {
    if (!usingFallback) setUsingFallback(true)
    else setFailed(true)
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox-top" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox-count" aria-live="polite">
          {index + 1} / {count}
        </span>
        <button ref={closeBtn} className="lightbox-btn" onClick={onClose} aria-label="Close (Esc)">
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </button>
      </div>

      {count > 1 && (
        <>
          <button
            className="lightbox-btn lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation()
              go(-1)
            }}
            aria-label="Previous photo (left arrow)"
          >
            <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
              <path d="M15 4l-8 8 8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
          <button
            className="lightbox-btn lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation()
              go(1)
            }}
            aria-label="Next photo (right arrow)"
          >
            <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
              <path d="M9 4l8 8-8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </>
      )}

      <figure className="lightbox-figure">
        {!loaded && !failed && <div className="lightbox-spinner" aria-label="Loading" />}
        {failed ? (
          <div className="lightbox-error">This photo could not be loaded.</div>
        ) : (
          <img
            key={src}
            src={src}
            alt={image.caption || image.alt || ''}
            onLoad={() => setLoaded(true)}
            onError={onError}
            className={loaded ? 'is-loaded' : ''}
            draggable="false"
            onClick={(e) => e.stopPropagation()}
          />
        )}
        {image.caption && <figcaption onClick={(e) => e.stopPropagation()}>{image.caption}</figcaption>}
      </figure>
    </div>
  )
}
