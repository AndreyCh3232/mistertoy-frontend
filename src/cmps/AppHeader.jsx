
import React from 'react'
import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export function AppHeader() {
    const [user, setUser] = useState(userService.getLoggedinUser())
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            await userService.logout()
            setUser(null)
            navigate('/')
        } catch (err) {
            console.error('Error during logout:', err)
        }
    }

    return (
        <React.Fragment>
            <header className='container'>
                {!user && <LoginSignup setUser={setUser} />}
                {user && (
                    <div className="nav-bar-container flex space-between">
                        <nav className="nav-bar">
                            <NavLink to="/toy">Toys</NavLink>
                            {user && <NavLink to="/user">Profile</NavLink>}
                            {user && user.isAdmin && <NavLink to="/admin">Admin</NavLink>}
                            <NavLink to="/map">Google Maps</NavLink>
                            <NavLink to="/form">Formik</NavLink>
                            <NavLink to="/chart">Chart.js</NavLink>
                            <NavLink to="/mui">Material UI</NavLink>
                            <NavLink to="/about">About</NavLink>
                        </nav>
                        <div>
                            <p>Hello, {user.fullname}</p>
                            <button className="btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </header>
            <UserMsg />
        </React.Fragment>
    )
}


