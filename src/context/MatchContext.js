import { useRouter } from 'next/router';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useContext } from 'react';
import matchStore from '@/lib/firestore/collections/match';
import nProgress from 'nprogress';
import Splash from '@/src/content/Splash';
import { useOrganizationContext } from './OrganizationContext';
import { useEventContext } from './EventContext';
import { useAuthContext } from './AuthContext';
import { useTournamentContext } from './TournamentContext';

const MatchContext = createContext({});

export const useMatchContext = () => useContext(MatchContext)

export default (props) => {
    const { organization, event, loading: tournamentLoading } = useTournamentContext();
    const { user } = useAuthContext();
    const router = useRouter()
    const [matches, setMatches] = useState({})
    const [current, setCurrent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeCount, setActiveCount] = useState({})

    const setMatch = async (data, active) => {
        await setMatches(data);
        setActiveCount(active)
    }

    const match = {
        matches,
        activeCount,
        current,
        setCurrent: async (id) => {
            setCurrent(id)
        },
        read: async () => {
            await matchStore.read(user?.id, setMatch, () => setLoading(false))
        },
        save: (data, id) => {
            return matchStore.save(data, id)
        },
        add: async (match) => {
            match = {
                ...match,
                uid: user?.id,
                deleted: false
            }
            return await matchStore.save(match, null)
        },
        update: async (id, newMatch) => {
            return await matchStore.save(newMatch, id)
        },
        delete: async (id) => {
            matchStore.save({ deleted: true }, id)
            router.push('/match/create?event=' + event.current)
        },
        uploadFile: matchStore.uploadFile,
        states: [
            {
                name: 'WAITING',
                value: 0,
            },
            {
                name: 'MISSING UPDATES',
                value: 1,
            },
            {
                name: 'SCHEDULING',
                value: 2,
            },
            {
                name: 'STARTED',
                value: 3,
            }
        ],
        admins: [
            {
                name: 'INST1NCT',
                value: 0
            },
            {
                name: 'Titane',
                value: 1
            }
        ],
        categories: [
            {
                name: 'Round I',
                value: 0
            },
            {
                name: 'Round II',
                value: 1
            }
        ],
        schedules: [
            {
                name: 'NOT STARTED',
                value: 0
            },
            {
                name: 'ONGOING',
                value: 1
            },
            {
                name: 'SCHEDULED',
                value: 2
            }
        ]
    }

    useEffect(() => {
        match.read()
    }, [])

    const isLoading = useMemo(() => {
        return tournamentLoading || loading;
    }, [tournamentLoading, loading])

    // useEffect(() => {
    //     if (isLoading == false && Object.keys(matches).length == 0 && event.current)
    //         router.push('/match/create?event=' + event.current)
    // }, [matches, isLoading, event.current])

    return (
        <MatchContext.Provider value={{
            match
        }}>
            {isLoading ? <Splash content='Loading data...'></Splash> : props.children}
        </MatchContext.Provider>
    )
}
