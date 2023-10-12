import { useState } from "react"
import { Button, Form } from "react-bootstrap";
import { useApi } from "../contexts/ApiProvider";
import { useFlash } from "../contexts/FlashProvider";

export default function Prediction({ prediction, matchId }) {
    const api = useApi();
    const flash = useFlash();
    const defaultHomeGoals = prediction ? prediction.home_goals : 0;
    const defaultAwayGoals = prediction ? prediction.away_goals : 0;
    const [homeGoals, setHomeGoals] = useState(defaultHomeGoals);
    const [awayGoals, setAwayGoals] = useState(defaultAwayGoals);
    const [hidden, setHidden] = useState(true);

    const handleChangeHome = (ev) => {
        setHomeGoals(parseInt(ev.target.value));
        if (parseInt(ev.target.value) === defaultHomeGoals && awayGoals === defaultAwayGoals) {
            setHidden(true);
        }
        else {
            setHidden(false);
        }
    }

    const handleChangeAway = (ev) => {
        setAwayGoals(parseInt(ev.target.value))
        if (homeGoals === defaultHomeGoals && parseInt(ev.target.value) === defaultAwayGoals) {
            setHidden(true);
        }
        else {
            setHidden(false);
        }
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        if (prediction === null) {
            const result = await api.post('/predictions', {
                home_goals: homeGoals,
                away_goals: awayGoals,
                match_id: matchId
            })
            if (result.ok) {
                flash('Prediction created', 'danger');
            }
        }
        else {
            const result = await api.put(`/predictions/${prediction.id}`, {
                home_goals: homeGoals,
                away_goals: awayGoals
            })
            if (result.ok) {
                flash('Prediction updated', 'danger');
            }
        }
        setHidden(true);
    }

    const handleCancel = () => {
        setHomeGoals(defaultHomeGoals);
        setAwayGoals(defaultAwayGoals);
        setHidden(true);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Control onChange={(ev) => handleChangeHome(ev)} type="number" value={homeGoals} min={0} max={9} />
            <Form.Control onChange={(ev) => handleChangeAway(ev)} type="number" value={awayGoals} min={0} max={9} />
            <Button type="Submit" hidden={hidden}>Save</Button>
            <Button onClick={handleCancel} type="Button" hidden={hidden}>Cancel</Button>
        </Form>
    )
}