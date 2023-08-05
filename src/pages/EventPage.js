import { useParams } from "react-router-dom";
import Body from "../components/Body";
import Event from "../components/Event";

export default function EventPage() {
    const { event_id } = useParams();

    return (
        <Body>
            <Event event_id={event_id} />
        </Body>
    )
}