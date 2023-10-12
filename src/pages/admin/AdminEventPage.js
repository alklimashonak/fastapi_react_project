import { useParams } from "react-router-dom";
import Body from "../../components/Body";
import AdminEvent from "../../components/admin/AdminEvent";

export default function EventPage() {
    const { event_id } = useParams();

    return (
        <Body>
            <AdminEvent event_id={event_id} />
        </Body>
    )
}