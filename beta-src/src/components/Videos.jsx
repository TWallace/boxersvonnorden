export default function Videos({ videos }) {
  if (!videos?.length) return null
  return (
    <section className="section">
      <h2>Videos</h2>
      <div className="video-grid">
        {videos.map((v) => (
          <figure key={v.youtube} className="video">
            <div className="video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.youtube}`}
                title={v.title}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <figcaption>{v.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
