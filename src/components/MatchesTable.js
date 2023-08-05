import { Table } from "react-bootstrap";

export default function MatchesTable({ matches, predictions }) {
    console.log(predictions)

    function getPredictionByMatchId(match_id) {
        for (const predict of predictions) {
            if (predict.match_id === match_id) {
                return predict;
            }
        }
        return null;
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Match</th>
                    <th>Result</th>
                    <th>Prediction</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {matches.map(match => {
                    let prediction = getPredictionByMatchId(match.id)
                    return (
                        <tr key={match.id}>
                            <td>{match.home_team} - {match.away_team}</td>
                            <td>{match.home_goals}-{match.away_goals}</td>
                            {prediction === null ?
                                <>
                                    <td>-</td>
                                    <td>-</td>
                                </> :
                                <>
                                    <td>{prediction.home_goals}-{prediction.away_goals}</td>
                                    <td>{prediction.points}</td>
                                </>
                            }
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}