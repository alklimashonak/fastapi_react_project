import {useUser} from "../contexts/UserProvider";
import Body from "../components/Body";
import TeamCard from "../components/TeamCard";
import {Stack} from "react-bootstrap";
import DriversList from "../components/DriversList";
import {useState} from "react";

export default function MyTeamPage() {
    const {user} = useUser();
    const [picks, setPicks] = useState(getDriversIds(user.team.drivers));
    const [teamDrivers, setTeamDrivers] = useState(user.team.drivers);

    function getDriversIds(drivers) {
        const driversIds = []
        drivers.map(driver => driversIds.push(driver.id))
        return driversIds
    }

    return (
        <Body>
            <Stack direction='horizontal' gap={3}>
                <TeamCard
                    teamDrivers={teamDrivers}
                    setTeamDrivers={setTeamDrivers}
                    picks={picks}
                    setPicks={setPicks}
                />
                <DriversList
                    teamDrivers={teamDrivers}
                    setTeamDrivers={setTeamDrivers}
                    picks={picks}
                    setPicks={setPicks}
                />
            </Stack>
        </Body>
    )
}