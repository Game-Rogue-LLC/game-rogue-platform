import { useContext, useEffect, useMemo, useState } from 'react'
import Button from '@mui/material/Button'
import {
    Box,
    Card,
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
    useTheme,
    Select,
    MenuItem
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
import MatchItem from '../components/MatchItem'
import TeamItem from '../components/TeamItem'

const Page = (props) => {
    const theme = useTheme()
    const router = useRouter()
    const { setTitle } = useAppContext()
    const { setCurrent: setCurrentOrganization } = useOrganizationContext()
    const { events, current: currentEvent, setCurrent: setCurrentEvent } = useEventContext()
    const { teams, setTeams, autoArrangeTeams, matches, setMatches } = useAutomateContext()
    const { match } = useMatchContext()
    const [tab, setTab] = useState("0")
    const [group, setGroup] = useState("0")
    const [team, setTeam] = useState("all")
    const [event, setEvent] = useState(null)
    const [automated, setAutomated] = useState(false)
    const [generated, setGenerated] = useState(false)

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

    const handleAutomate = (e) => {
        autoArrangeTeams(32)
        setAutomated(true)
    }

    const groupTeams = useMemo(() => {
        return teams.slice(group * 4, group * 4 + 4)
    }, [group, teams])

    const filteredMatches = useMemo(() => {
        return matches.slice(group * 6, group * 6 + 6).filter((val, i) => team == "all" || val.team1 == team || val.team2 == team)
    }, [group, team, matches])

    const generateScore = () => {
        const temp = matches.map((val, i) => {
            const rand = Math.random();
            return {
                ...val,
                result: (rand > 0.65 ? 1 : rand < 0.35 ? 2 : 0)
            }
        });
        setGenerated(true)
        setMatches(temp)
    }

    const scoredTeams = useMemo(() => {
        if (generated) {
            const res = teams.slice(group * 4, group * 4 + 4).sort((a, b) => a.score - b.score)
            console.log(res)
            return res
        }
        return []
    }, [teams, generated, group])

    const getTeamById = (id) => {
        return teams.findIndex(val => val.id === id)
    }

    useEffect(() => {
        if (generated) {
            let temp = [...teams]
            temp = temp.map((val, i) => {
                return {
                    ...val,
                    score: 0
                }
            })
            matches.slice(group * 6, group * 6 + 6).map((val, i) => {
                const t1 = getTeamById(val.team1),
                    t2 = getTeamById(val.team2)
                if (val.result == 1) {
                    temp[t1].score += 3
                } else if (val.result == 2) {
                    temp[t2].score += 3
                } else {
                    console.log('draw')
                    temp[t1].score++
                    temp[t2].score++
                }
            })
            setTeams([...temp])
        }
    }, [matches, generated, group])

    useEffect(() => {
        setTitle('MATCHES')
    }, [])

    useEffect(() => {
        setTeam("all")
    }, [group])

    useEffect(() => {
        console.log("match changed: ", matches)
    }, [matches])

    useEffect(() => {
        const newEvent = router.query?.event
        setEvent(newEvent)
        setCurrentEvent(newEvent)
        setCurrentOrganization(events[newEvent]?.oid)
    }, [router, events])

    return (
        <Box sx={{ width: '100%' }}>
            <TabContext value={tab}>
                <TabList onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="GROUP" value="0" id="tab-1" />
                    <Tab label="PAY OFFS" value="1" id="tab-2" />
                </TabList>
                <TabPanel value="0">
                    {automated == false
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
                                    {groupTeams.map((val, i) => {
                                        return (
                                            <MenuItem key={"team_" + val.id} sx={{ display: 'flex', alignItems: 'center' }} value={`${val.id}`}>
                                                <TeamItem team={val} />
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                                {!generated
                                    ? <Button variant='contained' onClick={() => generateScore()}>
                                        Generate
                                    </Button>
                                    : <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        {scoredTeams.map((val, i) => {
                                            return <p key={"scored_" + val.id}>{val.score}</p>
                                        })}
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
                    Item Two
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
