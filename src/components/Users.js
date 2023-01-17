import {Spinner, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import User from "./User";
import {useApi} from "../contexts/ApiProvider";

export default function Users() {
    const [users, setUsers] = useState();
    const api = useApi();

    useEffect(() => {
        (async () => {
            const response = await api.get('/users/');
            if (response.ok) {
                setUsers(response.body);
            }
            else {
                setUsers(null);
            }
        })();
    }, [api]);

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