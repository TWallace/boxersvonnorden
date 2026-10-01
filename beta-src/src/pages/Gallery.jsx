import PageTitle from '../components/PageTitle'
import Photo from '../components/Photo'
import Videos from '../components/Videos'
import { galleryPage } from '../lib/content'

const photos = galleryPage.photos || []
const videos = galleryPage.videos || []

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

      {photos.length > 0 ? (
        <div className="masonry">
          {photos.map((img, i) => (
            <Photo key={img.file} image={img} set={photos} index={i} />
          ))}
        </div>
      ) : (
        <p className="muted-note">More photos are coming soon.</p>
      )}

      <Videos videos={videos} />
    </div>
  )
}
