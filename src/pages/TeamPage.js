import Body from "../components/Body";
import {useApi} from "../contexts/ApiProvider";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ListGroup, ListGroupItem, Spinner} from "react-bootstrap";

export default function TeamPage() {
    const {teamId} = useParams();
    const [team, setTeam] = useState();
    const [drivers, setDrivers] = useState();
    const api = useApi();

    useEffect(() => {
        (async () => {
            const response = await api.get('/teams/' + teamId)
            if (response.ok) {
                setTeam(response.body.team)
                setDrivers(response.body.team.drivers)
            } else {
                setTeam(null)
                setDrivers(null)
            }
        })()
    }, [teamId, api])

    return (
        <Body>
            <h1>Team Page</h1>
            <>
                {
                    team === undefined ?
                        <Spinner animation="border"/>
                        :
                        <>
                            {
                                team === null ?
                                    <p>No team</p>
                                    :
                                    <>
                                        <p>Name: {team.name}</p>
                                        {
                                            drivers === undefined ?
                                                <Spinner animation="border"/>
                                                :
                                                <>
                                                    {
                                                        drivers === null ?
                                                            <p>No drivers</p>
                                                            :
                                                            <ListGroup>
                                                                {
                                                                    drivers.map(driver => {
                                                                        return (
                                                                            <ListGroupItem key={driver.id}>
                                                                                <p>{driver.last_name}</p>
                                                                            </ListGroupItem>
                                                                        )
                                                                    })
                                                                }
                                                            </ListGroup>
                                                    }
                                                </>
                                        }
                                    </>
                            }
                        </>}
            </>
        </Body>
    )
}