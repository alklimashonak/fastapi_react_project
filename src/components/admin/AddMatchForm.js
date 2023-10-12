import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputField from '../InputField';
import { Button } from 'react-bootstrap';
import { useFlash } from '../../contexts/FlashProvider';
import { useApi } from '../../contexts/ApiProvider';

export default function AddMatchForm({ event_id, matchesCount, setMatchesCount }) {
    const [formErrors, setFormErrors] = useState({});
    const [addMatchHidden, setAddMatchHidden] = useState(true);
    const homeTeamField = useRef();
    const awayTeamField = useRef();
    const flash = useFlash();
    const api = useApi();

    useEffect(() => {
        !addMatchHidden && homeTeamField.current.focus();
    }, [addMatchHidden]);

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

        console.log(formErrors)

        if (errors.home_Team || errors.away_team) {
            return;
        }

        const result = await api.post(`/events/${event_id}/matches`, {
            home_team: home_team,
            away_team: away_team,
            start_time: Date.now()
        });

        if (result.status === 422) {
            const errorMsg = `${result.body.detail[0].msg} (${result.body.detail[0].loc[1]})`
            flash(errorMsg, 'danger');
        } else if (result.ok) {
            setMatchesCount(matchesCount + 1)
            homeTeamField.current.value = ""
            awayTeamField.current.value = ""
        }
    };

    return (
        addMatchHidden ?
        <Button onClick={() => setAddMatchHidden(!addMatchHidden)}>
            {
                addMatchHidden && 'Add match'
            }
        </Button> :
        <Form onSubmit={onSubmit}>
            <InputField
                name="home_team" label="Home team"
                error={formErrors.home_team} fieldRef={homeTeamField} />
            <InputField
                name="away_team" label="Away team"
                error={formErrors.away_team} fieldRef={awayTeamField} />
            <Button onSubmit={onSubmit}
                variant="primary"
                type="submit"
                className='align-self-start w-25'
            >
                Add
            </Button>
            <Button onClick={() => setAddMatchHidden(!addMatchHidden)}>
                Close
            </Button>
        </Form>
    );
}