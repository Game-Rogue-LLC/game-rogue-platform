import {
    Card
} from '@mui/material'
import TeamItem from './TeamItem'

export default function (props) {
    const { match, team1, team2 } = props
    return (
        <Card sx={{ mt: 1, p: 2 }}>
            {match &&
                <>
                    <TeamItem team={team1} win={match?.result == 1 ? 2 : match?.result == 0 ? 1 : match?.result == 2 ? 0 : undefined} />
                    <TeamItem team={team2} sx={{ mt: 1 }} win={match?.result == 2 ? 2 : match?.result == 0 ? 1 : match?.result == 1 ? 0 : undefined} />
                </>
            }
        </Card>
    )
}