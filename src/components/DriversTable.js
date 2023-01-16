import {Spinner, Table} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function DriversTable() {
    const [drivers, setDrivers] = useState()

    useEffect(() => {
        (async () => {
            const response = await fetch('http://127.0.0.1:8000/api/drivers/')
            if (response.ok) {
                const result = await response.json()
                setDrivers(result)
            }
        })()
    }, [])
    return (
        <>
            {drivers === undefined ?
                <Spinner animation="border"/>
                :
                <>
                    {drivers === null ?
                        <p>There are no drivers</p>
                        :
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Short Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {drivers.map(driver => {
                                return (
                                    <DriverRow driver={driver}/>
                                )
                            })
                            }
                            </tbody>
                        </Table>
                    }
                </>
            }
        </>
    )
}

function DriverRow({driver}) {
    return (
        <tr>
            <td>1</td>
            <td>{driver.first_name}</td>
            <td>{driver.last_name}</td>
            <td>{driver.short_name}</td>
        </tr>
    )
}