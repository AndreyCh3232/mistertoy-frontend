export function ToyPreview({ toy }) {
  return (
    <article>
      <h1>🤖</h1>
      <p>
        Name Toy: <span>{toy.name}</span>
      </p>
      <p>
        Price: <span style={{ color: 'red' }}>{toy.price}$</span>
      </p>
    </article>
  )
} 
