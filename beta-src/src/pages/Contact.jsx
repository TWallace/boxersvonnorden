import PageTitle from '../components/PageTitle'
import { contact, site } from '../lib/content'

export default function Contact() {
  return (
    <div className="container page contact">
      <PageTitle title={contact.heading} />
      <h1>{contact.heading}</h1>
      <p className="lead">{contact.intro}</p>
      <address>
        <strong>{site.owner}</strong>
        <br />
        {site.location}
      </address>
      <p>
        <a className="btn" href={`mailto:${site.email}`}>Email {site.email}</a>
      </p>
      {site.facebook && (
        <p>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer">Find us on Facebook</a>
        </p>
      )}
    </div>
  )
}
