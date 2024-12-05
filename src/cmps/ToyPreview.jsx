export function ToyPreview({ toy }) {
  return (
    <article>
      <h4>{toy.title}</h4>
      <h1>🤖</h1>
      <p>
        Severity: <span>{toy.severity}</span>
      </p>
    </article>
  )
} 
