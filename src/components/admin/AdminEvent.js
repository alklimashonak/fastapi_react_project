import { useEffect, useState } from "react";
import AdminMatchesTable from "../admin/AdminMatchesTable";
import { Button, Spinner } from "react-bootstrap";
import { useApi } from '../../contexts/ApiProvider';
import AddMatchForm from "./AddMatchForm";
import { useNavigate } from "react-router-dom";
import { useFlash } from "../../contexts/FlashProvider";

export default function Event({ event_id }) {
    const api = useApi();
    const flash = useFlash();
    const navigate = useNavigate();
    const [event, setEvent] = useState();
    const [matchesCount, setMatchesCount] = useState();

    useEffect(() => {
        (async () => {
            const response1 = await api.get('/events/' + event_id);
            setEvent(response1.ok ? response1.body : null);
            setMatchesCount(response1.body.matches.length)
        })();
    }, [api, event_id, matchesCount]);

    const handleRun = async (eventId) => {
        const result = await api.patch('/events/' + eventId + '/run')
        if (result.status === 400) {
            const errorMsg = `${result.body.detail}`
            flash(errorMsg, 'danger');
        }
        else if (result.ok) {
            navigate('/admin');
        }
    }

    const handleDelete = async (eventId) => {
        const result = await api.delete('/events/' + eventId)
        if (result.ok) {
            navigate('/admin');
        }
    }

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
                                <p>deadline: {Date(event.deadline)}</p>
                                <p>Status: {event.status}</p>
                                {event.matches.length > 0 ?
                                    <AdminMatchesTable matches={event.matches} matchesCount={matchesCount} setMatchesCount={setMatchesCount} />
                                    :
                                    <p>There are no matches</p>
                                }
                                <AddMatchForm event_id={event.id} matchesCount={matchesCount} setMatchesCount={setMatchesCount} />
                                {event.status === 0 ?
                                <Button onClick={() => handleRun(event.id)}>
                                    Run
                                </Button> :
                                <Button>Revert</Button>                          
                                }
                                <Button onClick={() => handleDelete(event.id)}>
                                    Delete
                                </Button>
                            </>
                    }
                </>
            }
        </>
    )
}