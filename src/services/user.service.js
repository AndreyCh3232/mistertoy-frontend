import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const BASE_URL = 'auth/'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getById,
    getEmptyCredentials
}

function login({ username, password }) {
    return httpService.post(`${BASE_URL}login`, { username, password })
        .then(user => {
            _setLoggedinUser(user)
            return user
        })
}


function signup({ username, password, fullname }) {
    return httpService.post(`${BASE_URL}signup`, { username, password, fullname })
        .then(user => {
            _setLoggedinUser(user)
            return user
        })
}

function logout() {
    return httpService.post(`${BASE_URL}logout`)
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        })
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getById(userId) {
    return httpService.get(`${BASE_URL}${userId}`)
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}
