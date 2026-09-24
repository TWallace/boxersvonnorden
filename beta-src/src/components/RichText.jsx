import { Fragment } from 'react'

// Lets the text in the content files use **bold** and [link text](https://address).
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g

export default function RichText({ text }) {
  const parts = String(text).split(TOKEN)
  return (
    <>
      {parts.map((part, i) => {
        let m = part.match(/^\*\*([^*]+)\*\*$/)
        if (m) return <strong key={i}>{m[1]}</strong>
        m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (m) {
          const external = /^https?:/.test(m[2])
          return (
            <a key={i} href={m[2]} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {m[1]}
            </a>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
