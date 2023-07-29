import { Stack, Table } from "react-bootstrap";

export default function Event({ event }) {
    return (
        <Stack>
            <h1>{event.name}</h1>
            <p>deadline: {event.deadline}</p>
            {event.matches ?
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
                        {event.matches.map(match => {
                            return (
                                <tr key={match.id}>
                                    <td>{match.home_team} - {match.away_team}</td>
                                    <td>{match.home_goals}-{match.away_goals}</td>
                                    {match.prediction === null ?
                                        <>
                                            <td>-</td>
                                            <td>-</td>
                                        </> :
                                        <>
                                            <td>{match.prediction.home_goals}-{match.prediction.away_goals}</td>
                                            <td>{match.prediction.points}</td>
                                        </>
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                :
                <p>There are no matches</p>
            }
        </Stack>
    )
}