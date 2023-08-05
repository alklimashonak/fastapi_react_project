import { Spinner, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useApi } from '../contexts/ApiProvider';
import { useEffect, useState } from 'react';


export default function EventsList() {

    const api = useApi();
    const [events, setEvents] = useState();

    useEffect(() => {
        (async () => {
            const response = await api.get('/events');
            setEvents(response.ok ? response.body : null);
        })();
    }, [api]);

    return (
        <>
            {events === undefined ?
                <Spinner animation="border" />
                :
                <>
                    {events === null ?
                        <p>There are no events</p>
                        :
                        <Stack className='w-25 align-content-end'>
                            {events.map(event => {
                                return (
                                    <Stack key={event.id}>
                                        <Stack direction='horizontal' gap={5}>
                                            <p>{event.name}</p>
                                            <p>{event.deadline}</p>
                                            <Link to={`/events/${event.id}`}>more</Link>
                                        </Stack>
                                    </Stack>
                                )
                            })}
                        </Stack>
                    }
                </>
            }
        </>
    )
}