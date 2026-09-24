// Photos live in the /img folder at the top of the website.
// A photo called "indy1.jpg" may have a small preview called "indy1-sm.jpg".
// If a preview does not exist, the full photo is used automatically.
const BASE = import.meta.env.VITE_IMG_BASE ?? '/img/'

export const fullUrl = (file) => (/^(https?:)?\/\//.test(file) || file.startsWith('/') ? file : BASE + file)

export const thumbUrl = (img) => {
  if (img.thumb) return fullUrl(img.thumb)
  return fullUrl(img.file).replace(/(\.[a-z0-9]+)$/i, '-sm$1')
}
