import { Container, Spinner, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useApi } from '../../contexts/ApiProvider';
import { useEffect, useState } from 'react';
import AddEventForm from './AddEventForm';


export default function EventsList() {

    const api = useApi();
    const [events, setEvents] = useState();
    const [eventsCount, setEventsCount] = useState();

    useEffect(() => {
        (async () => {
            const response = await api.get('/events?admin_mode=true');
            setEvents(response.ok ? response.body : null);
        })();
    }, [api, eventsCount]);

    return (
        <>
            {events === undefined ?
                <Spinner animation="border" />
                :
                <Stack direction='horizontal' gap={5}>
                    <AddEventForm eventsCount={eventsCount} setEventsCount={setEventsCount} />
                    {events === null ?
                        <p>There are no events</p>
                        :
                        <Stack direction='horizontal' className='w-25 align-content-end'>
                            {events.map(event => {
                                return (
                                    <Container>
                                        <p>{event.name}</p>
                                        <p>Deadline date: {`${new Date(event.deadline).getDate()}/${new Date(event.deadline).getMonth()}/${new Date(event.deadline).getFullYear()}`}</p>
                                        <p>Deadline time: {`${new Date(event.deadline).getHours()}:${new Date(event.deadline).getMinutes()}`}</p>
                                        <Link to={`/admin/events/${event.id}`}>more</Link>
                                    </Container>
                                )
                            })}
                        </Stack>
                    }
                </Stack>
            }
        </>
    )
}