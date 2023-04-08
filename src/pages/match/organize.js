import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Button from '@mui/material/Button'
import {
    Box,
    Card,
    Grid,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableFooter,
    Tabs,
    Tab,
    Radio,
    useTheme,
    Select,
    MenuItem,
    Tooltip
} from '@mui/material'
import AdminLayout from '@/content/AdminLayout'
import { useAppContext } from '@/context/app'
import { useRouter } from 'next/router'
import { useEventContext } from '@/src/context/EventContext'
import { useOrganizationContext } from '@/src/context/OrganizationContext'
import { useMatchContext } from '@/src/context/MatchContext'
import dayjs from 'dayjs'
import { AutomateProvider, useAutomateContext } from '@/src/context/AutomateContext'
import {
    TabContext,
    TabList,
    TabPanel
} from '@mui/lab'
import { nanoid } from 'nanoid'
import dynamic from 'next/dynamic'
import MatchItem from '../components/MatchItem'
import TeamItem from '../components/TeamItem'

import MatchComponent from '../components/match/MatchComponent'

const SingleEliminationBracket = dynamic(() => import('@g-loot/react-tournament-brackets').then((mod) => mod.SingleEliminationBracket), {
    ssr: false, // This ensures the component is only rendered on the client-side
    loading: () => <p>Loading...</p>
});

const Match = dynamic(() => import('@g-loot/react-tournament-brackets').then((mod) => mod.Match), {
    ssr: false, // This ensures the component is only rendered on the client-side
    loading: () => <p>Loading...</p>
});

const Page = (props) => {
    const theme = useTheme()
    const router = useRouter()
    const { setTitle } = useAppContext()
    const { setCurrent: setCurrentOrganization } = useOrganizationContext()
    const { events, current: currentEvent, setCurrent: setCurrentEvent } = useEventContext()
    const { teams, setTeams, autoArrangeTeams, getRandomArray, matches, setMatches, round, setRound, scores, setScores } = useAutomateContext()
    const { match } = useMatchContext()
    const [tab, setTab] = useState("0")
    const [group, setGroup] = useState("0")
    const [team, setTeam] = useState("all")
    const [event, setEvent] = useState(null)
    const [roundTeams, setRoundTeams] = useState([])
    const [windowDefined, setWindowDefined] = useState(false)
    const [automated0, setAutomated0] = useState(false)
    const [automated1, setAutomated1] = useState(false)
    const [arranged, setArranged] = useState(false)
    const [generated0, setGenerated0] = useState(false)
    const [generated1, setGenerated1] = useState(false)
    const [games, setGames] = useState([])

    const groups = [
        "Group 1",
        "Group 2",
        "Group 3",
        "Group 4",
        "Group 5",
        "Group 6",
        "Group 7",
        "Group 8"
    ]

    const handleChange = (e, newValue) => {
        setTab(newValue)
    }

    // functions for group match
    const handleAutomate = async (e) => {
        await autoArrangeTeams(32, round)
        setAutomated0(true)
    }

    const teamsByGroup = useMemo(() => {
        return teams.slice(group * 4, group * 4 + 4)
    }, [group, teams])

    const scoredTeams = useMemo(() => {
        if (generated0) {
            const res = teams.slice(group * 4, group * 4 + 4).sort((a, b) => a.score - b.score)
            return res
        }
        return []
    }, [teams, generated0, group])

    const filteredMatches = useMemo(() => {
        return matches.filter(val => val.round == 0)
            .slice(group * 6, group * 6 + 6)
            .filter((val, i) => team == "all" || val.team1 == team || val.team2 == team)
    }, [group, team, matches])

    const generateScore = () => {
        const temp = matches.map((val, i) => {
            const rand = Math.random();
            return {
                ...val,
                result: (rand > 0.65 ? 1 : rand < 0.35 ? 2 : 0)
            }
        });
        setGenerated0(true)
        setMatches(temp)
        const newTeams = [...teams]
        temp.forEach((val, i) => {
            const t1 = getTeamById(val.team1),
                t2 = getTeamById(val.team2)
            if (val.result == 1) {
                newTeams[t1].score += 3
            } else if (val.result == 2) {
                newTeams[t2].score += 3
            } else {
                newTeams[t1].score++
                newTeams[t2].score++
            }
        })

        for (let i = 0; i < 8; i++) {
            const res = newTeams.slice(i * 4, i * 4 + 4).sort((a, b) => a.score - b.score)
            newTeams[getTeamById(res[0].id)].status = 0
            newTeams[getTeamById(res[1].id)].status = 0
            newTeams[getTeamById(res[2].id)].status = 1
            newTeams[getTeamById(res[3].id)].status = 1
        }
        setTeams(newTeams)
    }

    const activeTeams = useMemo(() => {
        return teams.filter((val, i) => val.status)
    }, [teams])

    const activeMatches = useMemo(() => {
        return matches.filter(val => val.round == 1)
    }, [matches])

    const getTeamById = (id) => {
        return teams.findIndex(val => val.id === id)
    }

    const handleArrange = (e) => {
        const arr = [...getRandomArray(teams.filter(val => val.status == 1))]
        const newMatches = []
        let newGames = [...games]
        for (let i = 0; i < arr.length / 2; i++) {
            const newMatch = {
                id: nanoid(),
                round: 1,
                team1: arr[i * 2].id,
                team2: arr[i * 2 + 1].id,
                result: null,
                status: 0
            }
            newMatches.push(newMatch)
            newGames[i].matchId = newMatch.id
            newGames[i].participants = [{
                id: `0${newMatch.id}`,
                isWinner: false,
                name: `Team ${newMatch.team1}`,
                picture: 'teamlogos/client_team_default_logo',
                resultText: '',
                status: null
            }, {
                id: `1${newMatch.id}`,
                isWinner: false,
                name: `Team ${newMatch.team2}`,
                picture: 'teamlogos/client_team_default_logo',
                resultText: '',
                status: null
            }]
        }
        console.log('new matches', newMatches)
        console.log('new games', newGames)
        setMatches([
            ...matches.filter(val => val.status == 0),
            ...newMatches
        ])
        setGames(newGames)
        setArranged(true)
    }

    const handleComplete = (e) => {
        setAutomated1(true)
    }

    const handlePartyClick = (party, partyWon) => {
        console.log(party, partyWon)
        if (partyWon == undefined) return
        let newGames = [...games],
            newMatches = [...matches]
        games.filter(val => val.participants[0]?.id == party.id || val.participants[1].id == party.id).forEach((val, i) => {
            const index = val.id
            if (index >= 0 && games[index].state != 'DONE') {
                if (games[index].participants[0].id == party.id) {
                    newGames[index].participants[0].isWinner = true
                    newGames[index].participants[0].resultText = "Won"
                    newGames[index].participants[1].isWinner = false
                    newGames[index].participants[1].resultText = "Lost"
                } else {
                    newGames[index].participants[1].isWinner = true
                    newGames[index].participants[1].resultText = "Won"
                    newGames[index].participants[0].isWinner = false
                    newGames[index].participants[0].resultText = "Lost"
                }
                newGames[index].state = 'DONE'
                let newMatch = {
                    id: nanoid(),
                    round: 1,
                    team1: null,
                    team2: null,
                    result: null,
                    status: 0
                }
                if (index % 2) newMatch.team2 = party.id;
                else newMatch.team1 = party.id
                if (games[index].nextMatchId) {
                    if (games[games[index].nextMatchId].matchId != null) {
                        newMatch.id = newGames[newGames[index].nextMatchId].matchId
                    } else {
                        newGames[newGames[index].nextMatchId].matchId = newMatch.id
                    }
                    newGames[newGames[index].nextMatchId].participants[index % 2] = {
                        ...party,
                        id: `${index % 2}${newMatch.id}`,
                        resultText: games[newGames[index].nextMatchId].participants[index % 2].resultText,
                        isWinner: false
                    }
                }
                for (let i = 0; i < newMatches.length; i++) {
                    if (newMatches[i].id == newGames[index].matchId) {
                        newMatches[i].status = 1
                    }
                    if (newMatches[i].id == newMatch.id) {
                        newMatch.round = newMatches[i].round + 1
                        newMatches[i] = newMatch
                    }
                }
                if (newMatches.findIndex(val => val.id == newMatch.id) < 0) {
                    newMatches.push(newMatch)
                }
            }
        })
        console.log(newMatches, newGames)
        setMatches(newMatches)
        setGames(newGames)
    }

    // const handleGenerateRound = (e) => {
    //     const start = matches.findIndex(val => val.status == 0)Math.floor(16 - Math.pow(2, 5 - round)),
    //         end = Math.floor(16 - Math.pow(2, 4 - round)),
    //         newGames = [...games]
    //     for (let i = start; i < end; i++) {
    //         const win = Math.random() > 0.5
    //         newGames[i].participants[0].isWinner = win
    //         newGames[i].participants[1].isWinner = !win
    //         newGames[i].participants[0].resultText = win ? "Win" : "Lose"
    //         newGames[i].participants[1].resultText = win ? "Lose" : "Win"
    //         const newParticipant = {
    //             id: newGames[i]?.id,
    //             isWinner: false,
    //             name: `Team ${i}`,
    //             picture: 'teamlogos/client_team_default_logo',
    //             resultText: '',
    //             status: null
    //         }
    //         if (Math.floor(games[i]?.nextMatchId / 2) % 2)
    //             newGames[games[i]?.nextMatchId]?.participants.push(newParticipant)
    //         else newGames[games[i]?.nextMatchId]?.participants.push(newParticipant)
    //     }
    //     setGames(newGames)
    // }

    useEffect(() => {
        setTitle('MATCHES')
    }, [])

    useEffect(() => {
        setTeam("all")
    }, [group])

    useEffect(() => {
        const newEvent = router.query?.event
        setEvent(newEvent)
        setCurrentEvent(newEvent)
        setCurrentOrganization(events[newEvent]?.oid)
    }, [router, events])

    useEffect(() => {
        if (round == 1) {
            const gameArr = []
            for (let i = 0; i < 15; i++) {
                let newGame = {
                    id: i,
                    matchId: null,
                    nextMatchId: (i < 14 ? Math.floor((16 + i) / 2) : null),
                    participants: [{}, {}
                        // {
                        //     id: '14754a1a-932c-4992-8dec-f7f94a339960',
                        //     isWinner: false,
                        //     name: 'CoKe BoYz',
                        //     picture: 'teamlogos/client_team_default_logo',
                        //     resultText: '',
                        //     status: null
                        // }
                    ],
                    startTime: '2021-05-30',
                    state: 'SCHEDULED',
                    tournamentRoundText: (i < 8 ? '1' : '2')
                }
                gameArr.push(newGame)
            }
            setGames(gameArr)
        }
    }, [round])

    return (
        <Box sx={{ width: '100%' }}>
            <TabContext value={tab}>
                <TabList onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="GROUP" value="0" id="tab-1" />
                    {round > 0 && <Tab label="STAGES" value="1" id="tab-2" />}
                </TabList>
                <TabPanel value="0">
                    {automated0 == false
                        ? <Button variant='contained' onClick={handleAutomate}>
                            Automate
                        </Button>
                        : <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Select value={group} onChange={(e) => setGroup(e.target.value)}>
                                    {groups.map((val, i) => {
                                        return <MenuItem key={"group_" + i} value={`${i}`}>{val}</MenuItem>
                                    })}
                                </Select>
                                <Select value={team} onChange={(e) => setTeam(e.target.value)}>
                                    <MenuItem key="team_all" sx={{ display: 'flex', alignItems: 'center' }} value="all">
                                        All Teams
                                    </MenuItem>
                                    {teamsByGroup.map((val, i) => {
                                        return (
                                            <MenuItem key={"team_" + val.id} sx={{ display: 'flex', alignItems: 'center' }} value={`${val.id}`}>
                                                <TeamItem team={val} />
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                                {!generated0
                                    ? <Button variant='contained' onClick={() => generateScore()}>
                                        Generate
                                    </Button>
                                    : <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Card sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
                                            <TeamItem team={teams[getTeamById(scoredTeams[0]?.id)]} />
                                            <p>({scoredTeams[0].score})</p>
                                        </Card>
                                        <Card sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
                                            <TeamItem team={teams[getTeamById(scoredTeams[1]?.id)]} />
                                            <p>({scoredTeams[1].score})</p>
                                        </Card>
                                        <Card sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
                                            <TeamItem team={teams[getTeamById(scoredTeams[2]?.id)]} />
                                            <p>({scoredTeams[2].score})</p>
                                        </Card>
                                        <Card sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
                                            <TeamItem team={teams[getTeamById(scoredTeams[3]?.id)]} />
                                            <p>({scoredTeams[3].score})</p>
                                        </Card>
                                        <Button variant='contained' onClick={() => {
                                            setRound(1)
                                            setTab("1")
                                        }} sx={{ display: (round == 1 && automated1) ? 'none' : 'block' }}>
                                            Next Stage
                                        </Button>
                                    </Box>}
                            </Box>
                            <Box>
                                {filteredMatches.map((val, i) => (
                                    <MatchItem
                                        key={"match_" + i}
                                        match={val}
                                        team1={teams[getTeamById(val.team1)]}
                                        team2={teams[getTeamById(val.team2)]}
                                    />
                                ))}
                            </Box>
                        </Box>}
                </TabPanel>
                <TabPanel value="1">
                    {round == 1 && games.length > 0 &&
                        <Grid container alignItems={'center'}>
                            <Grid item xs={1} textAlign={'right'}>
                                <Button variant='contained' onClick={handleArrange} disabled={automated1}>
                                    Arrange
                                </Button>
                            </Grid>
                            <Grid item xs={10} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                {activeTeams.map((team, index) => (
                                    <Tooltip key={`team_${team.id}`} title={`Team ${team.id + 1}`}>
                                        <Card sx={{ position: 'relative', py: 1, px: 2 }}>
                                            {team.icon}
                                        </Card>
                                    </Tooltip>
                                ))}
                            </Grid>
                            <Grid item xs={1}>
                                <Button variant='contained' onClick={handleComplete} hidden={!arranged} disabled={automated1}>
                                    Complete
                                </Button>
                            </Grid>
                        </Grid>}
                    {games.length > 0 &&
                        <SingleEliminationBracket
                            options={{
                                style: {
                                    roundHeader: {
                                        backgroundColor: '#180e05',
                                        fontColor: '#fff',
                                    },
                                    // connectorColor: '#CED1F2',
                                    // connectorColorHighlight: '#da96c6',
                                    // wonBywalkOverText: '#00ff00'
                                },
                            }}
                            matches={games}
                            matchComponent={(props) => (
                                <MatchComponent {...props}
                                    onPartyClick={(party, partyWon) => handlePartyClick(party, partyWon)}
                                />
                            )}
                        />}
                </TabPanel>
            </TabContext>
        </Box>
    )
}

Page.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>
}

Page.provider = AutomateProvider

export default Page;
