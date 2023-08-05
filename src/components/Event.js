import { useEffect, useState } from "react";
import MatchesTable from "./MatchesTable";
import { Spinner } from "react-bootstrap";
import { useApi } from '../contexts/ApiProvider';
import AddMatchForm from "./AddMatchForm";

export default function Event({ event_id }) {
    const api = useApi();
    const [event, setEvent] = useState();
    const [predictions, setPredictions] = useState();

    useEffect(() => {
        (async () => {
            const response1 = await api.get('/events/' + event_id);
            const response2 = await api.get('/predictions/' + event_id);
            setEvent(response1.ok ? response1.body : null);
            setPredictions(response2.ok ? response2.body : null)
        })();
    }, [api, event_id]);

    return (
        <>
            {event === undefined ?
                <Spinner animation="border" />
                :
                <>
                    {
                        event === null ?
                            <p>No event</p>
                            :
                            <>
                                <h1>{event.name}</h1>
                                <p>deadline: {event.deadline}</p>
                                {event.matches.length > 0 ?
                                    <MatchesTable matches={event.matches} predictions={predictions} />
                                    :
                                    <p>There are no matches</p>
                                }
                                <AddMatchForm event_id={event.id} />
                            </>
                    }
                </>
            }
        </>
    )
}