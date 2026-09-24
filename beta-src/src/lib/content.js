// Loads every JSON file in src/content automatically.
// To add a dog or litter, just add a new .json file in the matching folder.
const dogModules = import.meta.glob('../content/dogs/*.json', { eager: true, import: 'default' })
const litterModules = import.meta.glob('../content/litters/*.json', { eager: true, import: 'default' })

const slugFromPath = (path) => path.split('/').pop().replace(/\.json$/, '')
const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name?.localeCompare?.(b.name)

export { default as site } from '../content/site.json'
export { default as home } from '../content/home.json'
export { default as memory } from '../content/memory.json'
export { default as rawFeeding } from '../content/raw-feeding.json'
export { default as galleryPage } from '../content/gallery.json'
export { default as contact } from '../content/contact.json'

export const dogs = Object.entries(dogModules)
  .map(([path, dog]) => ({ ...dog, slug: slugFromPath(path) }))
  .sort(byOrder)

export const litters = Object.entries(litterModules)
  .map(([path, litter]) => ({ ...litter, id: slugFromPath(path) }))
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

export const maleDogs = dogs.filter((d) => d.sex === 'male')
export const femaleDogs = dogs.filter((d) => d.sex === 'female')
export const memorialDogs = dogs.filter((d) => d.memorial)

export const fullName = (dog) => (dog.titles ? `${dog.name}, ${dog.titles}` : dog.name)

// Every distinct photo on the site, for the Gallery page.
export function allPhotos() {
  const seen = new Set()
  const out = []
  const add = (img, source) => {
    if (!img?.file || seen.has(img.file)) return
    seen.add(img.file)
    out.push({ ...img, source })
  }
  dogs.forEach((d) => {
    add(d.photo, d.name)
    ;(d.photos || []).forEach((p) => add(p, d.name))
  })
  litters.forEach((l) => (l.photos || []).forEach((p) => add(p, l.title)))
  return out
}
