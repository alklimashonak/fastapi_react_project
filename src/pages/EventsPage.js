import { useEffect, useState } from "react";
import Body from "../components/Body";
import Events from "../components/Events";
import { useApi } from "../contexts/ApiProvider";


export default function EventsPage() {
    const api = useApi();
    const [events, setEvents] = useState();
    
    useEffect(() => {
        (async () => {
            const response = await api.get('/events');
            setEvents(response.ok ? response.body : null);
        })();
    }, [api]);

    return (
        <Body>
            <h1>Events Page</h1>
            <Events events={events} />
        </Body>
    )
}