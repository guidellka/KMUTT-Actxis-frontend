import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, Button, } from 'antd'

import axios from 'scripts/Api'

const Container = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    flex-wrap: wrap;
`

const Test = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState('') 
    const [username, setUsername] = useState('')
    const [newUser, setNewUser] = useState('')
    const [create, setCreate] = useState(null)
    const [edit, setEdit] = useState(null)
    const [del, setDelete] = useState(null)

    const firstFetchUsers = async () => {
        const { data } = await axios.get('/users')
        console.log('>>> [test.js:26] data : ', data)
        setUsers(data.user)
    }

    useEffect(() => {
        firstFetchUsers()
    }, [])

    return (
        <Container>
            <Card title="Get All User">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button onClick={async () => {
                    const { data } = await axios.get('/users')
                    console.log('>>> [test.js:55] data : ', data)
                    setUsers(data.user)
                }}>Fetch</Button>
            </Card>


            <Card title="Get User By Id">
                Id: <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
                <div>
                    {user && `Id : ${user.id}, Username: ${user.username}`}
                </div>
                <Button onClick={async () => {
                    const { data } = await axios.get(`/users/${userId}`)
                    console.log('>>> [test.js:66] data : ', data)
                    setUser(data)
                }}>Fetch</Button>
            </Card>

            
            <Card title="Create New User">
                Username: <input type="text" value={newUser} onChange={e => setNewUser(e.target.value)} />
                <div>
                    {create && `Create Id : ${create} success`}
                </div>
                <Button onClick={async () => {
                    const { data } = await axios.post('/users', {
                        username: newUser
                    })
                    console.log('>>> [test.js:79] data : ', data)
                    setCreate(data)
                }}>Create</Button>
            </Card>
            <Card title="Edit Username By Id">
                Id: <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
                <br/>
                Username: <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <div>
                    {edit && `Edit Id : ${edit} success`}
                </div>
                <Button onClick={async () => {
                    const { data } = await axios.patch(`/users/${userId}`, {
                        username
                    })
                    console.log('>>> [test.js:94] data : ', data)
                    setEdit(data)
                }}>Edit</Button>
            </Card>
            <Card title="Delete Username By Id">
                Id: <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
                <div>
                    {del && `Delete Id : ${del} success`}
                </div>
                <Button onClick={async () => {
                    const { data } = await axios.delete(`/users/${userId}`)
                    console.log('>>> [test.js:105] data : ', data)
                    setDelete(data)
                }}>Delete</Button>
            </Card>
        </Container>
    )
}

export default Test
