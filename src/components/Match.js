import Prediction from "./Prediction";

export default function Match({ match, prediction }) {
    return (
        <tr key={match.id}>
            <td>
                {match.home_team} - {match.away_team}
            </td>
            <td>
                <Prediction prediction={prediction} matchId={match.id} />
            </td>
            <td>
                {match.home_goals} - {match.away_goals}
            </td>
            <td>
                {prediction ? prediction.points : 0}
            </td>
        </tr>
    )
}