
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function UserProfile() {
    const [user, setUser] = useState(userService.getLoggedInUser())
    const [toys, setToys] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/')
            return
        }
        loadUsertoys()
    }, [user])

    async function loadUsertoys() {
        try {
            const res = await toyService.query({ userId: user._id })
            setToys(res.toys)
        } catch (err) {
            console.error('Error loading user toys:', err)
            showErrorMsg('Cannot load user toys')
        }
    }

    async function onRemovetoy(toyId) {
        try {
            await toyService.remove(toyId)
            setToys((prevToys) => prevToys.filter((toy) => toy._id !== toyId))
            showSuccessMsg('Toy removed successfully')
        } catch (err) {
            console.error('Error removing toy:', err)
            showErrorMsg('Cannot remove toy')
        }
    }

    async function onEditToy(toy) {
        try {
            const price = +prompt('New price?', toy.price)
            const toyToSave = { ...toy, price }
            const savedToy = await toyService.save(toyToSave)
            setToys((prevToys) =>
                prevToys.map((currToy) => (currToy._id === savedToy._id ? savedToy : currToy))
            )
            showSuccessMsg('Toy updated successfully')
        } catch (err) {
            console.error('Error updating toy:', err)
            showErrorMsg('Cannot update toy')
        }
    }

    if (!user) return null
    return (
        <section className="user-profile main-layout">
            <h1>Hello, {user.fullname}</h1>

            {!toys || (!toys.length && <h2>No toys to show</h2>)}
            {toys && toys.length > 0 && <h3>Manage your toys</h3>}
            <ToyList toys={toys} onRemovetoy={onRemovetoy} onEditToy={onEditToy} />
        </section>
    )
}
