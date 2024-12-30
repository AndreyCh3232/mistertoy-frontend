import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const BASE_URL = 'auth/'

export const userService = {
    login,
    signup,
    logout,
    getLoggedInUser,
    getById,
    getEmptyCredentials
}

async function login({ username, password }) {
    try {
        const user = await httpService.post(`${BASE_URL}login`, { username, password })
        _setLoggedinUser(user)
        return user
    } catch (err) {
        console.error('Error logging in:', err)
        throw err
    }
}

async function signup({ username, password, fullname }) {
    try {
        const user = await httpService.post(`${BASE_URL}signup`, { username, password, fullname })
        _setLoggedinUser(user)
        return user
    } catch (err) {
        console.error('Error signing up:', err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post(`${BASE_URL}logout`)
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    } catch (err) {
        console.error('Error logging out:', err)
        throw err
    }
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function getById(userId) {
    try {
        return await httpService.get(`${BASE_URL}${userId}`)
    } catch (err) {
        console.error(`Error getting user with ID ${userId}:`, err)
        throw err
    }
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
