import PageTitle from '../components/PageTitle'
import RichText from '../components/RichText'
import { rawFeeding } from '../lib/content'

export default function RawFeeding() {
  return (
    <div className="container page prose">
      <PageTitle title={rawFeeding.heading} />
      <h1>{rawFeeding.heading}</h1>
      {rawFeeding.intro && <p className="lead"><RichText text={rawFeeding.intro} /></p>}
      {rawFeeding.sections?.map((s) => (
        <section key={s.title} className="section">
          <h2>{s.title}</h2>
          {s.paragraphs?.map((p, i) => <p key={i}><RichText text={p} /></p>)}
          {s.list?.length > 0 && (
            <ul>{s.list.map((item, i) => <li key={i}><RichText text={item} /></li>)}</ul>
          )}
        </section>
      ))}
    </div>
  )
}
