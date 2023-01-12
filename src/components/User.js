import {Card} from "react-bootstrap";

export default function User({ user }) {
    return (
        <Card className='Card'>
            <Card.Body>
                <h1>{user.email}</h1>
                {user.is_superuser ?
                    <p>superuser</p> :
                    <p>user</p>
                }
            </Card.Body>
        </Card>
    )
}