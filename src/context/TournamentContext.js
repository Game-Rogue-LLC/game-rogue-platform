import { useState, useContext, createContext, useEffect } from "react";
import axios from 'axios';
import { nanoid } from 'nanoid';
import store from '@/lib/firestore/collections';
import { useAuthContext } from "./AuthContext";

const TournamentContext = createContext({})

export const useTournamentContext = () => useContext(TournamentContext);

const TournamentProvider = (props) => {
    const { user } = useAuthContext();
    const [tournaments, setTournaments] = useState([]);
    const [matches, setMatches] = useState([])
    const [participants, setParticipants] = useState([])

    // useEffect(() => {
    //     axios.get('/api/tournament').then(res => {
    //         console.log(res.data)
    //     })
    // }, [])

    /* Begin Team Data / Functions */
    const [teams, setTeams] = useState({});
    const [teamLoading, setTeamLoading] = useState(true);
    const team = {
        teams,
        setTeams,
        create: async (newTeam) => {
            const res = await store.team.save(nanoid(5), newTeam);
            return res;
        },
        read: async (uid) => {
            setTeamLoading(true);
            const res = await store.team.read(uid, async (data) => {
                await setTeams(data);
                console.log('teams: ', data)
            }, () => setTeamLoading(false));
        },
        update: async (id, newTeam) => {
            const res = await store.team.save(id, newTeam);
            return res;
        },
        delete: async (id) => {
            await store.team.save(id, { deleted: true });
            router.push('/team/create');
        },
        check: async ({ id, accessCode }) => {
            console.log(id, accessCode)
            const res = await store.team.getById(id);
            if (res.code === 'succeed') {
                if (res.data.accessCode === accessCode) {
                    return {
                        code: 'succeed'
                    }
                } else {
                    return {
                        code: 'failed',
                        message: 'Access Code does not match'
                    }
                }
            }
            return {
                code: 'failed',
                message: res.message
            }
        },
        upload: store.team.uploadFile,
        positions: [
            {
                val: 0,
                name: 'Manager'
            },
            {
                val: 1,
                name: 'Player'
            }
        ]
    }
    /* End Team Data / Functions */

    /* Begin Player Data / Functions */
    const [players, setPlayers] = useState({});
    const [playerLoading, setPlayerLoading] = useState(true);
    const player = {
        players,
        setPlayers,
        create: async (newPlayer) => {
            const res = await store.player.save(nanoid(5), newPlayer);
            return res;
        },
        read: async () => {
            setPlayerLoading(true);
            const res = await store.player.readAll(async (data) => {
                await setPlayers(data);
                console.log('players: ', data)
            }, () => setPlayerLoading(false));
        },
        update: async (id, newTeam) => {
            const res = await store.player.save(id, newTeam);
            return res;
        },
        delete: async (id) => {
            await store.player.save(id, { deleted: true });
            // router.push('/');
        }
    }
    /* End Team Data / Functions */
    useEffect(() => {
        if (user) {
            team.read(user.id);
            player.read();
        }
    }, [user])

    return (
        <TournamentContext.Provider value={{ tournaments, matches, participants, team, player }}>
            {props.children}
        </TournamentContext.Provider>
    )
}

export default TournamentProvider