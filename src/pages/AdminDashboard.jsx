import { userService } from '../services/user.service.js'
import { UserList } from '../cmps/UserList.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useEffect, useState } from 'react'

export function AdminDashboard() {
    const user = userService.getLoggedinUser()
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.query()
                setUsers(fetchedUsers);
            } catch (err) {
                console.error('Error fetching users:', err)
                showErrorMsg('Failed to load users')
            }
        }

        fetchUsers()
    }, [])

    async function onRemoveUser(userId) {
        try {
            await userService.remove(userId)
            const usersToUpdate = users.filter(u => u._id !== userId)
            setUsers(usersToUpdate)
            showSuccessMsg('Removed successfully')
        } catch (err) {
            console.error('Error removing user:', err)
            showErrorMsg('Had issues removing the user')
        }
    }

    if (!user || !user.isAdmin) return <div>You are not allowed in this page</div>

    return (
        <section className="admin-dashboard main-layout">
            <h1>Hello, {user.fullname}</h1>
            <h3>User Managment</h3>
            <UserList users={users} onRemoveUser={onRemoveUser} />
        </section>
    )
}
