import {Button, Container, ListGroup, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useApi} from "../contexts/ApiProvider";

export default function DriversList({teamDrivers, setTeamDrivers, disabled, setDisabled}) {
    const api = useApi()
    const [drivers, setDrivers] = useState()

    useEffect(() => {
        (async () => {
            const response = await api.get('/drivers');
            if (response.ok) {
                setDrivers(response.body);
                setDisabled(getDriversIds(teamDrivers))
            } else {
                setDrivers(null);
            }
        })();
    }, [api, teamDrivers, setDisabled]);

    const getDriversIds = (drivers) => {
        const driversIds = []
        drivers.map(driver => driversIds.push(driver.id))
        return driversIds
    }

    const handleButtonAdd = (driver) => {
        if (teamDrivers.length < 5) {
            setTeamDrivers(teamDrivers.concat([driver]))
            setDisabled(disabled.concat([driver.id]))
        }
    }

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
                                                <Button
                                                    onClick={() => handleButtonAdd(driver)}
                                                    className='DriverButton'
                                                    disabled={disabled.includes(driver.id)}
                                                >
                                                    {driver.last_name}
                                                </Button>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Container>
                    }
                </>
            }
        </>
    )
}