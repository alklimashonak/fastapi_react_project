import { Spinner, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Events({ events }) {

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
                                        <p>{event.name}</p>
                                        <Link to={`/events/${event.id}`}>more</Link>
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