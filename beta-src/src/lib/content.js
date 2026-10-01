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

// A dog marked "memorial" appears only on the Forever in Memory page, not in the Male/Female Dogs lists.
export const maleDogs = dogs.filter((d) => d.sex === 'male' && !d.memorial)
export const femaleDogs = dogs.filter((d) => d.sex === 'female' && !d.memorial)
export const memorialDogs = dogs.filter((d) => d.memorial)

export const fullName = (dog) => (dog.titles ? `${dog.name}, ${dog.titles}` : dog.name)
