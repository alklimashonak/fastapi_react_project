import Body from "../../components/Body";
import AdminEventsList from "../../components/admin/AdminEventsList";
import { useUser } from "../../contexts/UserProvider";


export default function AdminPage() {
    const { user } = useUser();

    return (
        <Body>
            <h1>Admin Page</h1>
            {user.is_superuser ?
                <AdminEventsList /> :
                <p>You don't have access</p>
            }
        </Body>
    )
}