import {ListGroup, ListGroupItem, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useApi} from "../contexts/ApiProvider";

export default function Users() {
    const [users, setUsers] = useState();
    const api = useApi();

    useEffect(() => {
        (async () => {
            const response = await api.get('/users');
            if (response.ok) {
                setUsers(response.body);
            } else {
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
                        <ListGroup>
                            {users.map(user => {
                                return (
                                    <ListGroupItem key={user.id} variant="primary">
                                        {user.email}
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    }
                </>
            }
        </>
    )
}