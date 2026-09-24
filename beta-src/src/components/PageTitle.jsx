import { useEffect } from 'react'
import { site } from '../lib/content'

export default function PageTitle({ title }) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : site.name
  }, [title])
  return null
}
