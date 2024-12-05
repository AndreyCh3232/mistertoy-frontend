import { httpService } from './http.service.js'

const availableLabels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
  'Building Blocks',
  'Creative',
  'Kids',
  'Vehicle',
  'Educational'
]

export const toyService = {
  query,
  save,
  remove,
  save,
  getById,
  getEmptyToy,
  getDefaultFilter,
  downloadPdf,
  labels: availableLabels
}

const BASE_URL = 'toy/'

function query(filterBy = {}) {
  return httpService
    .get(BASE_URL)
    .then((toys) => {
      let filteredtoys = toys
      if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        filteredtoys = filteredtoys.filter((toy) => regExp.test(toy.title))
      }
      if (filterBy.minSeverity) {
        filteredtoys = filteredtoys.filter((toy) => toy.severity >= filterBy.minSeverity)
      }
      return filteredtoys
    })
}

function getById(toyId) {
  return httpService
    .get(`${BASE_URL}${toyId}`)
    .catch((err) => {
      console.error(`Error getting toy with ID ${toyId}:`, err)
      throw err
    })
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    inStock: null,
    labels: []
  }
}


function remove(toyId) {
  return httpService
    .delete(`${BASE_URL}${toyId}`)
    .catch((err) => {
      console.error(`Error removing toy with ID ${toyId}:`, err)
      throw err
    })
}

function save(toy) {
  if (toy._id) {
    return httpService
      .put(`${BASE_URL}${toy._id}`, toy)
      .catch((err) => {
        console.error('Error updating toy:', err)
        throw err;
      })
  } else {
    return httpService
      .post(BASE_URL, toy)
      .catch((err) => {
        console.error('Error adding new toy:', err)
        throw err
      })
  }
}

function getDefaultFilter() {
  return { txt: '', minSeverity: 0 }
}

function downloadPdf() {
  httpService({
    url: '/api/toy/pdf',
    method: 'GET',
    responseType: 'blob'
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'toys.pdf')
      document.body.appendChild(link)
      link.click()

      link.remove()
      window.URL.revokeObjectURL(url)
    })
    .catch((error) => {
      console.error('Error downloading PDF:', error)
    })
}
