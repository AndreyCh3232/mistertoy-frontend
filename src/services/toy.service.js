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

async function query(filterBy = {}) {
  try {
    const toys = await httpService.get(BASE_URL)
    let filteredToys = toys

    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      filteredToys = filteredToys.filter((toy) => regExp.test(toy.name))
    }

    if (filterBy.minprice) {
      filteredToys = filteredToys.filter((toy) => toy.price >= filterBy.minprice)
    }

    return filteredToys
  } catch (err) {
    console.error('Error querying toys:', err)
    throw err
  }
}

async function getById(toyId) {
  try {
    return await httpService.get(`${BASE_URL}${toyId}`)
  } catch (err) {
    console.error(`Error getting toy with ID ${toyId}:`, err)
    throw err
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    inStock: null,
    labels: []
  }
}


async function remove(toyId) {
  try {
    return await httpService.delete(`${BASE_URL}${toyId}`)
  } catch (err) {
    console.error(`Error removing toy with ID ${toyId}:`, err)
    throw err
  }
}

async function save(toy) {
  try {
    if (toy._id) {
      return await httpService.put(`${BASE_URL}${toy._id}`, toy)
    } else {
      return await httpService.post(BASE_URL, toy)
    }
  } catch (err) {
    console.error('Error saving toy:', err)
    throw err
  }
}

function getDefaultFilter() {
  return { txt: '', minprice: 0 }
}

async function downloadPdf() {
  try {
    const response = await httpService({
      url: '/api/toy/pdf',
      method: 'GET',
      responseType: 'blob'
    })

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'toys.pdf')
    document.body.appendChild(link)
    link.click()

    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Error downloading PDF:', err)
    throw err
  }
}
