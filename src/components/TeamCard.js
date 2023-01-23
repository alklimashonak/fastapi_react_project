import {useEffect, useState} from "react";
import {Container, Spinner} from "react-bootstrap";
import DriversItem from "./DriversItem";
import {useApi} from "../contexts/ApiProvider";

export default function TeamCard({ teamId }) {
    const api = useApi()
    const [team, setTeam] = useState()

    useEffect(() => {
        (async () => {
            const response = await api.get(`/teams/${teamId}`)
            if (response.ok) {
                setTeam(response.body.team)
            } else {
                setTeam(null)
            }
        })()
    }, [api, teamId])

    return (
        <Container>
            {
                team === undefined ?
                    <Spinner animation='border'/>
                    :
                    <>
                        {
                            team === null ?
                                <h1>There is no team</h1>
                                :
                                <DriversItem team={team} />
                        }
                    </>
            }
        </Container>
    )
}