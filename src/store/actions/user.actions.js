import { userService } from '../../services/user.service.js'
import { SET_IS_LOADING } from '../reducers/toy.reducer.js'
import { SET_USER, SET_USERS } from '../reducers/user.reducer.js'
import { store } from '../store.js'

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
    } catch (error) {
        console.log('user actions -> Cannot login', error)
        throw error
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
    } catch (error) {
        console.log('user actions -> Cannot signup', error)
        throw error
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (error) {
        console.log('user actions -> Cannot logout', error)
        throw error
    }
}

export async function loadUsers() {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}