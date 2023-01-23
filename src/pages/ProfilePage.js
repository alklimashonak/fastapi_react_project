import Body from "../components/Body";
import {useUser} from "../contexts/UserProvider";

export default function ProfilePage() {
    const {user} = useUser();

    return (
        <Body>
            <p>Email: {user.email}</p>
        </Body>
    )
}