import {useUser} from "../contexts/UserProvider";
import Body from "../components/Body";
import TeamCard from "../components/TeamCard";
import {Stack} from "react-bootstrap";
import DriversList from "../components/DriversList";
import {useState} from "react";

export default function MyTeamPage() {
    const {user} = useUser();
    const [teamDrivers, setTeamDrivers] = useState(user.team.drivers);
    const [disabled, setDisabled] = useState([])

    return (
        <Body>
            <Stack direction='horizontal' gap={3}>
                <TeamCard
                    teamDrivers={teamDrivers}
                    setTeamDrivers={setTeamDrivers}
                    disabled={disabled}
                    setDisabled={setDisabled}
                    team={user.team}
                />
                <DriversList
                    teamDrivers={teamDrivers}
                    setTeamDrivers={setTeamDrivers}
                    disabled={disabled}
                    setDisabled={setDisabled}
                />
            </Stack>
        </Body>
    )
}