import {Button, Container, ListGroup, ListGroupItem, Stack} from "react-bootstrap";
import {useState} from "react";
import DriversList from "./DriversList";
import {useDrivers} from "../contexts/DriversProvider";

export default function DriversItem({team}) {
    const [picks, setPicks] = useState(getTeamDriversIds(team))
    const [teamDrivers, setTeamDrivers] = useState(team.drivers)
    const {drivers, setDrivers} = useDrivers()

    function getTeamDriversIds(team) {
        const driversIds = []
        team.drivers.map(driver => driversIds.push(driver.id))
        return driversIds
    }

    const handleButtonRemove = ({driver}) => {
        if (picks.includes(driver.id)) {
            const arr = picks.filter(item => item !== driver.id)
            const newTeamDrivers = teamDrivers.filter(item => item.id !== driver.id)
            const newDrivers = drivers.concat([driver])
            setPicks(arr)
            setDrivers(newDrivers)
            setTeamDrivers(newTeamDrivers)
        } else {
            const arr = picks.concat([driver.id])
            setPicks(arr)
        }
        console.log(picks)
    }

    return (
        <Stack direction='horizontal' gap={3}>
            <Container className='align-self-start'>
                <ListGroup horizontal='xl' className='align-self-start'>
                    {
                        teamDrivers.map(driver => {
                            return (
                                <ListGroupItem key={driver.id} variant='primary'>
                                    <Button
                                        onClick={
                                            () => handleButtonRemove({driver: driver})
                                        }>
                                        {picks.includes(driver.id) ? driver.last_name : null}
                                    </Button>
                                </ListGroupItem>
                            )
                        })
                    }
                </ListGroup>
            </Container>
            <Button onClick={() => console.log(picks)} className='align-self-start'>Click</Button>
            <DriversList
                picks={picks}
                setPicks={setPicks}
                teamDrivers={teamDrivers}
                setTeamDrivers={setTeamDrivers}/>
        </Stack>
    )
}