// const { useState, useRef, useEffect } = React
// const { useNavigate } = ReactRouterDOM

import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function UserProfile() {
    const [user, setUser] = useState(userService.getLoggedinUser())
    const [toys, setToys] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/')
            return
        }
        loadUsertoys()
    }, [user])

    function loadUsertoys() {
        toyService.query({ userId: user._id }).then(res => {
            console.log('res:', res)

            setToys(res.toys)
        })
    }

    function onRemovetoy(toyId) {
        toyService
            .remove(toyId)
            .then(() => {
                console.log('Deleted Succesfully!')
                setToys(prevtoys => prevtoys.filter(toy => toy._id !== toyId))
                showSuccessMsg('toy removed')
            })
            .catch(err => {
                console.log('from remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }
        toyService
            .save(toyToSave)
            .then(savedtoy => {
                console.log('Updated toy:', savedtoy)
                setToys(prevtoys =>
                    prevtoys.map(currtoy =>
                        currtoy._id === savedtoy._id ? savedtoy : currtoy
                    )
                )
                showSuccessMsg('toy updated')
            })
            .catch(err => {
                console.log('from edit toy', err)
                showErrorMsg('Cannot update toy')
            })
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
