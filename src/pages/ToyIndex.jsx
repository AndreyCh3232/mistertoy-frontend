import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/toyFilter.jsx'
import { useEffect, useState } from 'react'

// const { useState, useEffect } = React

export function ToyIndex() {
  const [toys, settoys] = useState(null)
  const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
  const [sortBy, setSortBy] = useState('title')
  const [pageIdx, setPageIdx] = useState(0)
  const pageSize = 5

  useEffect(() => {
    loadtoys()
  }, [filterBy, sortBy, pageIdx])

  function loadtoys() {
    toyService
      .query({ ...filterBy, sortBy, pageIdx, pageSize })
      .then(settoys)
      .catch((err) => {
        showErrorMsg('cant load toys')
        console.error('Error loading toys:', err)
      })
  }

  function onRemovetoy(toyId) {
    toyService
      .remove(toyId)
      .then(() => {
        const toysToUpdate = toys.filter((toy) => toy._id !== toyId)
        settoys(toysToUpdate)
        showSuccessMsg('toy removed successfully')
      })
      .catch((err) => {
        console.log('Error removing toy', err)
        showErrorMsg('Cannot remove toy')
      })
  }

  function onAddtoy() {
    const toy = {
      title: prompt('toy title?'),
      severity: +prompt('toy severity?'),
    }
    toyService
      .save(toy)
      .then((savedtoy) => {
        settoys((prevtoys) => [...toys, savedtoy])
        showSuccessMsg('toy added successfully')
      })
      .catch((err) => {
        console.log('Error adding toy:', err)
        showErrorMsg('Cannot add toy')
      })
  }

  function onEdittoy(toy) {
    const severity = +prompt('New severity?', toy._id ? toy.severity : '')
    const description = prompt('Edit Desctiption', toy._id ? toy.description : '')
    const toyToSave = { ...toy, severity, description }
    toyService
      .save(toyToSave)
      .then((savedtoy) => {
        console.log('Updated toy:', savedtoy)
        const toysToUpdate = toys.map((currtoy) => (currtoy._id === savedtoy._id ? savedtoy : currtoy))
        settoys(toysToUpdate)
        showSuccessMsg('toy updated successfully')
      })
      .catch((err) => {
        console.log('Error updating toy:', err)
        showErrorMsg('Cannot update toy')
      })
  }

  function onDownloadPdf() {
    toyService
      .downloadPdf()
      .then(() => {
        showSuccessMsg('PDF downloaded')
      })
      .catch((err) => {
        console.error('Error downloading PDF:', err)
        showErrorMsg('Failed to generate PDF')
      })
  }

  function onSetFilterBy(newFilterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...newFilterBy }))
  }

  function onSortChange(e) {
    setSortBy(e.target.value)
  }

  function onNextPage() {
    setPageIdx((prevPageIdx) => prevPageIdx + 1)
  }

  function onPrevPage() {
    setPageIdx((prevPageIdx) => Math.max(prevPageIdx - 1, 0))
  }

  return (
    <main>
      <section className="info-actions">
        <h3>toys App</h3>
        <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <label>
          Sort by:
          <select value={sortBy} onChange={onSortChange}>
            <option value="title">Title</option>
            <option value="severity">Severity</option>
            <option value="createdAt">Created At</option>
          </select>
        </label>
        <button onClick={onAddtoy}>Add toy</button>
        <button onClick={onDownloadPdf}>Download PDF</button>
      </section>
      <main>
        <ToyList toys={toys} onRemovetoy={onRemovetoy} onEdittoy={onEdittoy} />
        <div className="pagination">
          <button onClick={onPrevPage} disabled={pageIdx === 0}>
            Previous
          </button>
          <span>Page {pageIdx + 1}</span>
          <button onClick={onNextPage} disabled={!toys || toys.length < pageSize}>
            Next
          </button>
        </div>
      </main>
    </main>
  )
}
