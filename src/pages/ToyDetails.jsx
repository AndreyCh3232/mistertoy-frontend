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
        <h3>toy Details 🐛</h3>
        <h4>{toy.title}</h4>
        <p>
          Severity: <span>{toy.severity}</span>
        </p>
        <p>
          description: <span>{toy.description}</span>
        </p>

        <Link to="/toy">Back to List</Link>
      </div>
    )
  )
}
