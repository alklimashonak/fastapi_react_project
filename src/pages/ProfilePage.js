import Body from "../components/Body";
import {useUser} from "../contexts/UserProvider";
import {Link} from "react-router-dom";
import {ListGroup, ListGroupItem} from "react-bootstrap";

export default function ProfilePage() {
    const {user} = useUser();

    return (
        <Body>
            <p>Email: {user.email}</p>
            {user.teams.length > 0 ?
                <>
                    <p>Teams:</p>
                    <ListGroup>
                    {
                        user.teams.map(team => {
                            return (
                                    <ListGroupItem key={team.id}>
                                        <Link to={'/teams/' + team.id}>{team.name}</Link> <br/>
                                    </ListGroupItem>
                            )
                        })
                    }
                    </ListGroup>
                </>
                :
                <p>You dont have teams</p>
            }
        </Body>
    )
}