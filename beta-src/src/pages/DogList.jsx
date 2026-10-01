import PageTitle from '../components/PageTitle'
import DogCard from '../components/DogCard'
import { maleDogs, femaleDogs } from '../lib/content'

export default function DogList({ sex }) {
  const title = sex === 'male' ? 'Male Dogs' : 'Female Dogs'
  const list = sex === 'male' ? maleDogs : femaleDogs
  return (
    <div className="container page">
      <PageTitle title={title} />
      <h1>{title}</h1>
      {list.length ? (
        <div className="card-grid">{list.map((d) => <DogCard key={d.slug} dog={d} />)}</div>
      ) : (
        <p>No dogs listed yet.</p>
      )}
    </div>
  )
}
