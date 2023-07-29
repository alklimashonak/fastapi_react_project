import {Container, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function Example() {
    const baseTeamDrivers = [
        {
            id: 1,
            last_name: 'Driver1'
        },
        {
            id: 2,
            last_name: 'Driver2'
        },
        {
            id: 3,
            last_name: 'Driver3'
        }
    ]
    const baseAllDrivers = [
        {
            id: 4,
            last_name: 'Driver4'
        },
        {
            id: 5,
            last_name: 'Driver5'
        },
        {
            id: 6,
            last_name: 'Driver6'
        }
    ]

    const [teamDrivers, setTeamDrivers] = useState(baseTeamDrivers)
    const [allDrivers, setAllDrivers] = useState(baseAllDrivers)
    const [driverOut, setDriverOut] = useState(null)
    const [driverIn, setDriverIn] = useState(null)

    useEffect(() => {
        const replaceDrivers = () => {
            console.log(`replace driverIn ${driverIn} and driverOut ${driverOut}`)
            setDriverOut(null)
            setDriverIn(null)
        }

        if (driverOut !== null && driverIn !== null) {
            replaceDrivers()
        }
    }, [driverIn, driverOut])

    const removeDriverButton = (driverId) => {
        setDriverOut(teamDrivers[driverId])
        console.log(`remove ${driverId}`)
    }

    const addDriverButton = (driverId) => {
        setDriverIn(allDrivers[driverId])
        console.log(`add ${driverId}`)
    }

    return (
        <Stack direction='horizontal'>
            <Container>
                {
                    [...Array(3).keys()].map(card => {
                        return (
                            <div key={card} className='bg-primary'>
                                <button onClick={() => removeDriverButton(card)}>
                                    {teamDrivers[card].last_name}
                                </button>
                            </div>
                        )
                    })
                }
            </Container>
            <Container>
                {
                    allDrivers.map(driver => {
                        return (
                            <div key={driver.id} className='bg-dark'>
                                <button onClick={() => addDriverButton(driver.id)}>
                                    {driver.last_name}
                                </button>
                            </div>
                        )
                    })
                }
            </Container>
        </Stack>
    )
}