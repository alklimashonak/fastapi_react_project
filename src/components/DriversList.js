import {Button, Container, ListGroup, Spinner} from "react-bootstrap";
import {useEffect} from "react";
import {useApi} from "../contexts/ApiProvider";
import {useDrivers} from "../contexts/DriversProvider";

export default function DriversList({picks, setPicks, teamDrivers, setTeamDrivers}) {
    const {driversAll, setDriversAll} = useDrivers()
    const api = useApi()

    const handleButtonAdd = (driver) => {
        if (picks.length < 5) {
            const newPicks = picks.concat([driver.id])
            const newTeamDrivers = teamDrivers.concat([driver])
            setPicks(newPicks)
            setTeamDrivers(newTeamDrivers)
        }
    }

    useEffect(() => {
        (async () => {
            const response = await api.get('/drivers');
            if (response.ok) {
                const driversList = response.body.filter(driver => !picks.includes(driver.id))
                setDriversAll(driversList);
            } else {
                setDriversAll(null);
            }
        })();
    }, [api, setDriversAll, picks]);

    return (
        <>
            {driversAll === undefined ?
                <Spinner animation="border"/>
                :
                <>
                    {driversAll === null ?
                        <p>There are no drivers</p>
                        :
                        <Container className='w-25 align-content-end'>
                            <ListGroup>
                                {
                                    driversAll.map(driver => {
                                        return (
                                            <ListGroup.Item key={driver.id}>
                                                <Button onClick={() => handleButtonAdd(driver)} className='DriverButton'>
                                                    {driver.last_name}
                                                </Button>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                            <Button onClick={() => console.log(driversAll)}>Show drivers</Button>
                        </Container>
                    }
                </>
            }
        </>
    )
}