import {Spinner, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useApi} from "../contexts/ApiProvider";

export default function DriversTable() {
    const [drivers, setDrivers] = useState()
    const api = useApi()

    useEffect(() => {
        (async () => {
            const response = await api.get('/drivers');
            if (response.ok) {
                setDrivers(response.body);
            }
            else {
                setDrivers(null);
            }
        })();
    }, [api]);
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
                                    <DriverRow key={driver.id} driver={driver}/>
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