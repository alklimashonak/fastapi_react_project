import {Button, Container, ListGroup, ListGroupItem} from "react-bootstrap";
 import {useApi} from "../contexts/ApiProvider";

export default function TeamCard({teamDrivers, setTeamDrivers, disabled, setDisabled, team}) {
    const api = useApi()

    const handleButtonRemove = ({driver}) => {
        if (teamDrivers.includes(driver)) {
            setTeamDrivers(teamDrivers.filter(item => item.id !== driver.id))
            setDisabled(disabled.filter(driverId => driverId !== driver.id))
        }
    }

    const handleSaveButton = async () => {
        const transfers = [];
        const driversBefore = [];
        const driversAfter = [];

        team.drivers.map(driver => driversBefore.push(driver.id));
        teamDrivers.map(driver => driversAfter.push(driver.id));

        let driversIn = driversAfter.filter(driver => !driversBefore.includes(driver));
        let driversOut = driversBefore.filter(driver => !driversAfter.includes(driver));

        if (driversIn.length === driversOut.length) {
            for (let i = 0; i < driversIn.length; i++) {
                let transfer = {driver_in: driversIn[i], driver_out: driversOut[i]};
                transfers.push(transfer)
            }
        }

        const data = {
            name: team.name,
            transfers: transfers
        };

        if (disabled.length === 5 && transfers.length > 0) {
             const response = await api.put(`/teams/${team.id}`, data);
             response.ok ? console.log(response.body) : console.log(response)
            window.location.reload();
        }
    }

    return (
            <Container className='align-self-start'>
                <ListGroup horizontal='xl' className='align-self-start'>
                    {
                        teamDrivers.map(driver => {
                            return (
                                <ListGroupItem key={driver.id} variant='primary'>
                                    <Button onClick={() => handleButtonRemove({driver: driver})}>
                                        {driver.last_name}
                                    </Button>
                                </ListGroupItem>
                            )
                        })
                    }
                </ListGroup>
                <Button type='submit' onClick={handleSaveButton}>
                    Save
                </Button>
            </Container>
    )
}