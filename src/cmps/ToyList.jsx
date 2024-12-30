
import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemovetoy, onEditToy }) {
    console.log(toys)

    if (!toys) return <div>Loading...</div>

    const validtoys = toys.filter(toy => toy && toy._id)

    return (
        <ul className="toy-list">
            {validtoys.map((toy) => (
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button onClick={() => onRemovetoy(toy._id)}>Delete</button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>
                    <Link to={`/toy/${toy._id}`}>Details</Link>
                </li>
            ))
            }
        </ul >
    )
}
