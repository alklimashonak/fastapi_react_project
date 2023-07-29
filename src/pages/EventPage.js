import { useEffect, useState } from "react";
import { useApi } from "../contexts/ApiProvider";
import { useParams } from "react-router-dom";
import Body from "../components/Body";
import Event from "../components/Event";
import { Spinner } from "react-bootstrap";

export default function EventPage() {
    const api = useApi();
    const { event_id } = useParams();
    const [event, setEvent] = useState();

    useEffect(() => {
        (async () => {
            const response = await api.get('/events/' + event_id + '/extra');
            setEvent(response.ok ? response.body : null);
        })();
    }, [api, event_id]);

    return (
        <Body>
            <>
                {event === undefined ?
                    <Spinner animation="border" />
                    :
                    <>
                        {
                            event === null ?
                                <p>No event</p>
                                :
                                <Event event={event} />
                        }
                    </>
                }
            </>
        </Body>
    )
}