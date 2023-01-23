import {Button, Container, ListGroup, Spinner} from "react-bootstrap";
import {useEffect} from "react";
import {useApi} from "../contexts/ApiProvider";
import {useDrivers} from "../contexts/DriversProvider";

export default function DriversList({picks, setPicks, teamDrivers, setTeamDrivers}) {
    const {drivers, setDrivers} = useDrivers()
    const api = useApi()

    const handleButtonAdd = (driver) => {
        if (picks.length < 5) {
            const newPicks = picks.concat([driver.id])
            const newDrivers = drivers.filter(item => item !== driver)
            const newTeamDrivers = teamDrivers.concat([driver])
            setPicks(newPicks)
            setDrivers(newDrivers)
            setTeamDrivers(newTeamDrivers)
        }
    }

    useEffect(() => {
        (async () => {
            const response = await api.get('/drivers');
            if (response.ok) {
                const driversList = response.body.filter(driver => !picks.includes(driver.id))
                setDrivers(driversList);
            } else {
                setDrivers(null);
            }
        })();
    }, [api, setDrivers, picks]);

    return (
        <>
            {drivers === undefined ?
                <Spinner animation="border"/>
                :
                <>
                    {drivers === null ?
                        <p>There are no drivers</p>
                        :
                        <Container className='w-25 align-content-end'>
                            <ListGroup>
                                {
                                    drivers.map(driver => {
                                        return (
                                            <ListGroup.Item key={driver.id}>
                                                <Button onClick={() => handleButtonAdd(driver)} className='DriverButton'>
                                                    {drivers.includes(driver) ? driver.last_name : null}
                                                </Button>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                            <Button onClick={() => console.log(drivers)}>Show drivers</Button>
                        </Container>
                    }
                </>
            }
        </>
    )
}