import {useUser} from "../contexts/UserProvider";
import Body from "../components/Body";
import TeamCard from "../components/TeamCard";

export default function MyTeamPage() {
    const { user } = useUser()

    return (
        <Body>
            {
                user.team === null ?
                    <h1>You don't have a team yet</h1>
                    :
                    <TeamCard teamId={user.team.id} />
            }
        </Body>
    )
}