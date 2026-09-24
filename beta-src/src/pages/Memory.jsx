import PageTitle from '../components/PageTitle'
import DogCard from '../components/DogCard'
import { memory, memorialDogs } from '../lib/content'

export default function Memory() {
  return (
    <div className="container page">
      <PageTitle title={memory.heading} />
      <h1>{memory.heading}</h1>
      <p className="lead">{memory.intro}</p>
      <div className="card-grid">
        {memorialDogs.map((d) => (
          <div key={d.slug} className="memorial-card">
            <DogCard dog={d} />
            {d.passed && <p className="passed">Passed {d.passed}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
