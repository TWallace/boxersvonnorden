import PageTitle from '../components/PageTitle'
import { Link } from '../lib/router'

export default function NotFound() {
  return (
    <div className="container page">
      <PageTitle title="Page not found" />
      <h1>Page not found</h1>
      <p>Sorry, we could not find that page. <Link to="/">Return home</Link>.</p>
    </div>
  )
}
