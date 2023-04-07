import { useRouter } from 'next/router';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useContext } from 'react';
import eventStore from '@/lib/firestore/collections/event';
import nProgress from 'nprogress';
import Splash from '@/src/content/Splash';
import { useOrganizationContext } from './OrganizationContext';
import { useAuthContext } from './AuthContext';

const EventContext = createContext({});

export const useEventContext = () => useContext(EventContext)

export default (props) => {
    const { current: currentOrganization, loading: loadingOrganization } = useOrganizationContext();
    const { user } = useAuthContext();
    const router = useRouter()
    const [events, setEvents] = useState({})
    const [current, setCurrent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeCount, setActiveCount] = useState({})

    const setEvent = async (data, active) => {
        await setEvents(data);
        setActiveCount(active)
    }

    const event = {
        readEvent: async () => {
            setLoading(true)
            await eventStore.read(user?.id, setEvent, () => setLoading(false))
        },
        saveEvent: (data, id) => {
            return eventStore.save(data, id)
        },
        addEvent: async (event) => {
            event = {
                ...event,
                uid: user?.id,
                deleted: false
            }
            return await eventStore.save(event, null)
        },
        updateEvent: async (id, newEvent) => {
            return await eventStore.save(newEvent, id)
        },
        deleteEvent: async (id) => {
            eventStore.save({ deleted: true }, id)
            router.push('/event/create?organization=' + currentOrganization)
        },
        setCurrentEvent: async (id) => {
            setCurrent(id)
        },
        uploadFile: eventStore.uploadFile,
        getEvents: (oid) => {
            let temp = {}
            Object.keys(events).forEach((key, i) => {
                if (events[key].oid == oid) {
                    temp[key] = {
                        ...events[key]
                    }
                }
            })
            return temp
        }
    }

    useEffect(() => {
        event.readEvent()
    }, [])

    const isLoading = useMemo(() => {
        return loadingOrganization || loading
    }, [loading, loadingOrganization])

    useEffect(() => {
        if (isLoading == false && Object.keys(events).length == 0 && currentOrganization)
            router.push('/event/create?organization=' + currentOrganization)
    }, [events, isLoading, currentOrganization])

    return (
        <EventContext.Provider value={{
            events, ...event,
            current, setCurrent,
            activeCount, loading
        }}>
            {props.children}
        </EventContext.Provider>
    )
}
