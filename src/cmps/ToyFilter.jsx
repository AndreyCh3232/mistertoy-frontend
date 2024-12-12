
import { useEffect, useState } from "react"

export function ToyFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    const updateFilter = async () => {
      await onSetFilterBy(filterByToEdit)
    }
    updateFilter()
  }, [filterByToEdit, onSetFilterBy])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }
  async function onSubmit(ev) {
    ev.preventDefault()
    console.log('Form submitted')
  }

  return (
    <fieldset>
      <legend>Filter</legend>
      <form className="toy-filter" onSubmit={onSubmit}>
        <input
          onChange={handleChange}
          name="txt"
          id="txt"
          value={filterBy.txt || ''}
          type="text"
          placeholder="Search toys..."
        />
        <label htmlFor="minprice">By price</label>
        <input
          onChange={handleChange}
          name="minprice"
          value={filterBy.minprice || 0}
          type="range"
          min="0"
          max="100"
          id="minprice"
        />
        <label htmlFor="minprice">{filterBy.minprice}</label>
      </form>
    </fieldset>
  )
}
