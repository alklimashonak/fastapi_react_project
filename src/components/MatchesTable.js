import { Table } from "react-bootstrap";
import Match from "./Match";

export default function MatchesTable({ matches, predictions }) {
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
                    <th>Prediction</th>
                    <th>Result</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {matches.map(match => {
                    let prediction = getPredictionByMatchId(match.id)
                    return (
                        <Match key={match.id} match={match} prediction={prediction} />
                    )
                })}
            </tbody>
        </Table>
    )
}