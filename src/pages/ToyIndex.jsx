import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/toyFilter.jsx'
import { useEffect, useState } from 'react'

export function ToyIndex() {
  const [toys, setToys] = useState(null)
  const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
  const [sortBy, setSortBy] = useState('name')
  const [pageIdx, setPageIdx] = useState(0)
  const pageSize = 5

  useEffect(() => {
    loadToys()
  }, [filterBy, sortBy, pageIdx])

  async function loadToys() {
    try {
      const toys = await toyService.query({ ...filterBy, sortBy, pageIdx, pageSize })
      setToys(toys)
    } catch (err) {
      console.error('Error loading toys:', err)
      showErrorMsg('Cannot load toys')
    }
  }

  async function onRemovetoy(toyId) {
    try {
      await toyService.remove(toyId)
      const toysToUpdate = toys.filter((toy) => toy._id !== toyId)
      setToys(toysToUpdate)
      showSuccessMsg('Toy removed successfully')
    } catch (err) {
      console.error('Error removing toy:', err)
      showErrorMsg('Cannot remove toy')
    }
  }

  async function onAddtoy() {
    try {
      const toy = {
        name: prompt('Toy name?'),
        price: +prompt('Toy price?'),
      };
      const savedToy = await toyService.save(toy)
      setToys((prevToys) => [...prevToys, savedToy])
      showSuccessMsg('Toy added successfully')
    } catch (err) {
      console.error('Error adding toy:', err)
      showErrorMsg('Cannot add toy')
    }
  }

  async function onEditToy(toy) {
    try {
      const price = +prompt('New price?', toy._id ? toy.price : '')
      const description = prompt('Edit Description', toy._id ? toy.description : '')
      const toyToSave = { ...toy, price, description }
      const savedToy = await toyService.save(toyToSave)
      const toysToUpdate = toys.map((currToy) => (currToy._id === savedToy._id ? savedToy : currToy))
      setToys(toysToUpdate)
      showSuccessMsg('Toy updated successfully')
    } catch (err) {
      console.error('Error updating toy:', err)
      showErrorMsg('Cannot update toy')
    }
  }

  async function onDownloadPdf() {
    try {
      await toyService.downloadPdf();
      showSuccessMsg('PDF downloaded');
    } catch (err) {
      console.error('Error downloading PDF:', err);
      showErrorMsg('Failed to generate PDF');
    }
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
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="createdAt">Created At</option>
          </select>
        </label>
        <button onClick={onAddtoy}>Add toy</button>
        <button onClick={onDownloadPdf}>Download PDF</button>
      </section>
      <main>
        <ToyList toys={toys} onRemovetoy={onRemovetoy} onEditToy={onEditToy} />
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
