import {Spinner, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import User from "./User";

export default function Users() {
    const [users, setUsers] = useState()

    useEffect(() => {
        (async () => {
            const response = await fetch('http://127.0.0.1:8000/api/users/')
            if (response.ok) {
                const result = await response.json()
                setUsers(result)
            }
        })()
    }, [])

    return (
        <>
            {users === undefined ?
                <Spinner animation="border"/>
                :
                <>
                    {users === null ?
                        <p>There are no users</p>
                        :
                        <Stack>
                            {users.map(user => {
                                return (
                                    <User key={user.id} user={user} />
                                )
                            })}
                        </Stack>
                    }
                </>
            }
        </>
    )
}