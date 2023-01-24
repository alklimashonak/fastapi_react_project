import {Button, Container, ListGroup, ListGroupItem} from "react-bootstrap";
import {useDrivers} from "../contexts/DriversProvider";

export default function TeamCard({teamDrivers, setTeamDrivers, picks, setPicks}) {
    const {driversAll, setDriversAll} = useDrivers()

    const handleButtonRemove = ({driver}) => {
        if (picks.includes(driver.id)) {
            const arr = picks.filter(item => item !== driver.id)
            const newTeamDrivers = teamDrivers.filter(item => item.id !== driver.id)
            const newDriversAll = driversAll.concat([driver])
            setPicks(arr)
            setDriversAll(newDriversAll)
            setTeamDrivers(newTeamDrivers)
        } else {
            const arr = picks.concat([driver.id])
            setPicks(arr)
        }
    }

    return (
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
    )
}