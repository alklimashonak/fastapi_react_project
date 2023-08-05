import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputField from './InputField';
import { Button, Stack } from 'react-bootstrap';
import { useFlash } from '../contexts/FlashProvider';
import { useApi } from '../contexts/ApiProvider';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AddMatchForm(event_id) {
    const [formErrors, setFormErrors] = useState({});
    const homeTeamField = useRef();
    const awayTeamField = useRef();
    const flash = useFlash();
    const api = useApi();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        homeTeamField.current.focus();
    }, []);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const home_team = homeTeamField.current.value;
        const away_team = awayTeamField.current.value;

        const errors = {};
        if (!home_team) {
            errors.home_Team = 'Home team must not be empty.';
        }
        if (!away_team) {
            errors.away_team = 'Away team must not be empty.';
        }
        setFormErrors(errors);

        const result = await api.post(`/events/${event_id}/matches`, {
            'home_team': home_team,
            'away_team': away_team,
            'start_time': Date.now.toString()
        });

        if (result === 'fail') {
            flash('Invalid data', 'danger');
        } else if (result === 'ok') {
            let next = `/events/${event_id}`;
            if (location.state && location.state.next) {
                next = location.state.next;
            }
            navigate(next);
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <InputField
                name="home_team" label="Home team"
                error={formErrors.home_team} fieldRef={homeTeamField} />
            <InputField
                name="away_team" label="Away team" type="password"
                error={formErrors.away_team} fieldRef={awayTeamField} />
            <Stack direction="horizontal" gap={3} className='justify-content-between'>
                <Button
                    variant="primary"
                    type="submit"
                    className='align-self-start w-25'
                >
                    Add
                </Button>
            </Stack>
        </Form>
    );
}