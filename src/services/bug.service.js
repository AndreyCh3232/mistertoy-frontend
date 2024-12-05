import { httpService } from './http.service.js'

export const bugService = {
  query,
  save,
  remove,
  save,
  getById,
  getDefaultFilter,
  downloadPdf
}

const BASE_URL = 'bug/'

function query(filterBy = {}) {
  return httpService
    .get(BASE_URL)
    .then((bugs) => {
      let filteredBugs = bugs
      if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        filteredBugs = filteredBugs.filter((bug) => regExp.test(bug.title))
      }
      if (filterBy.minSeverity) {
        filteredBugs = filteredBugs.filter((bug) => bug.severity >= filterBy.minSeverity)
      }
      return filteredBugs
    })
}

function getById(bugId) {
  return httpService
    .get(`${BASE_URL}${bugId}`)
    .catch((err) => {
      console.error(`Error getting bug with ID ${bugId}:`, err)
      throw err
    })
}

function remove(bugId) {
  return httpService
    .delete(`${BASE_URL}${bugId}`)
    .catch((err) => {
      console.error(`Error removing bug with ID ${bugId}:`, err)
      throw err
    })
}

function save(bug) {
  if (bug._id) {
    return httpService
      .put(`${BASE_URL}${bug._id}`, bug)
      .catch((err) => {
        console.error('Error updating bug:', err)
        throw err;
      })
  } else {
    return httpService
      .post(BASE_URL, bug)
      .catch((err) => {
        console.error('Error adding new bug:', err)
        throw err
      })
  }
}

function getDefaultFilter() {
  return { txt: '', minSeverity: 0 }
}

function downloadPdf() {
  httpService({
    url: '/api/bug/pdf',
    method: 'GET',
    responseType: 'blob'
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'bugs.pdf')
      document.body.appendChild(link)
      link.click()

      link.remove()
      window.URL.revokeObjectURL(url)
    })
    .catch((error) => {
      console.error('Error downloading PDF:', error)
    })
}
