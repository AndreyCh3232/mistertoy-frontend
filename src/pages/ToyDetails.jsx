// const { useState, useEffect } = React
// const { Link, useParams } = ReactRouterDOM

import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { Link, useParams } from 'react-router-dom'

export function ToyDetails() {
  const [toy, settoy] = useState(null)
  const { toyId } = useParams()

  useEffect(() => {
    toyService
      .getById(toyId)
      .then((toy) => {
        settoy(toy)
      })
      .catch((err) => {
        showErrorMsg('Cannot load toy')
      })
  }, [])

  if (!toy) return <h1>loadings....</h1>
  return (
    toy && (
      <div>
        <h3 style={{ textAlign: 'center' }}>Toy Details</h3>
        <h2>🤖</h2>
        <p>
          Name Toy: <span>{toy.name}</span>
        </p>
        <p>
          Price: <span>{toy.price}$</span>
        </p>
        <Link to="/toy">Back to List</Link>
      </div>
    )
  )
}
