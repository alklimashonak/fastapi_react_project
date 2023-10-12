import { Button, Table } from "react-bootstrap";
import { useApi } from "../../contexts/ApiProvider";
import { useFlash } from "../../contexts/FlashProvider";

export default function MatchesTable({ matches, matchesCount, setMatchesCount }) {
    const api = useApi();
    const flash = useFlash();

    const handleClick = async (matchId) => {
        const result = await api.delete('/matches/' + matchId)
        if (result.ok) {
            flash('Successfully deleted', 'danger');
            setMatchesCount(matchesCount - 1)
        }
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Match</th>
                    <th>Result</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {matches.map(match => {
                    return (
                        <tr key={match.id}>
                            <td>{match.home_team} - {match.away_team}</td>
                            <td>{match.home_goals}-{match.away_goals}</td>
                            <td>
                                <Button onClick={() => handleClick(match.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}