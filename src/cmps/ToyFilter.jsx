// const { useEffect, useState } = React

import { useEffect, useState } from "react"

export function ToyFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

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
  function onSubmit(ev) {
    ev.preventDefault()
    console.log('Form submitted')
  }

  return (
    <fieldset>
      <legend>Filter</legend>
      <form className="toy-filter" onSubmit={onSubmit}>
        <input onChange={handleChange} name="txt" id="txt" value={filterBy.txt || ''} type="text" placeholder="Search toys..." />
        <label htmlFor="minSeverity">By price</label>
        <input onChange={handleChange} name="minSeverity" value={filterBy.minSeverity || 0} type="range" min="0" max="10" id="minSeverity" />
        <label htmlFor="minSeverity">{filterBy.minSeverity}</label>
      </form>
    </fieldset>
  )
}
