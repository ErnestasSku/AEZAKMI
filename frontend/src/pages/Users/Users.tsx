import React from 'react'
import { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'

interface User {
    id: number;
    email: string;
    password: string;
    username: string;
    role_id: unknown;
}

export const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users');
            const body = await response.json();
            setUsers(body);
        }
        fetchData();
    }, [])

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
                <h2>Users</h2>
                {users.map(user =>
                    <div key={user.id}>
                        {user.username} ({user.email})
                    </div>
                )}
            </div>
        </header>
    )
}