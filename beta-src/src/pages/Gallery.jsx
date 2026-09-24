import PageTitle from '../components/PageTitle'
import Photo from '../components/Photo'
import { galleryPage, allPhotos } from '../lib/content'

const photos = allPhotos()

export default function Gallery() {
  return (
    <div className="container page">
      <PageTitle title={galleryPage.heading} />
      <h1>{galleryPage.heading}</h1>
      <p className="lead">
        {galleryPage.intro}{' '}
        {galleryPage.facebook && (
          <a href={galleryPage.facebook} target="_blank" rel="noopener noreferrer">Follow us on Facebook</a>
        )}
      </p>
      <div className="masonry">
        {photos.map((img, i) => (
          <Photo key={img.file} image={img} set={photos} index={i} />
        ))}
      </div>
    </div>
  )
}
