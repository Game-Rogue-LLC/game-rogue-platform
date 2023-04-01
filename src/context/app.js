import { useRouter } from 'next/router';
import { createContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useAuthContext } from './AuthContext';
import { useContext } from 'react';
import organizationStore from '@/lib/firestore/collections/organization';
import eventStore from '@/lib/firestore/collections/event';
import nProgress from 'nprogress';
import Splash from '@/srccontent/Splash';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext)

export default (props) => {
    const router = useRouter();
    const { user, loading: userLoading } = useAuthContext();
    const [organizations, setOrganizations] = useState({});
    const [events, setEvents] = useState([]);
    const [current, setCurrent] = useState({
        organization: null,
        event: null
    })
    const [loading, setLoading] = useState({
        user: userLoading && true,
        organization: true,
        event: false
    })
    const [activeCount, setActiveCount] = useState({
        organization: 0,
        event: 0
    });
    const [title, setTitle] = useState(null);

    const setOrganization = async (data, activeCount) => {
        console.log('setting data...');
        await setOrganizations(data);
        console.log('finished setting data')
        setLoading(prev => ({
            ...prev,
            organization: false
        }))
        setActiveCount(prev => ({
            ...prev,
            organization: activeCount
        }))
    }

    const setEvent = async (data, activeCount) => {
        await setEvents(data);
        setLoading(prev => ({
            ...prev,
            event: false
        }))
        setActiveCount(prev => ({
            ...prev,
            event: activeCount
        }))
    }

    const organization = {
        readOrganization: () => {
            console.log('reading organization...')
            organizationStore.read(user?.id, setOrganization)
        },
        saveOrganization: (data, id) => {
            return organizationStore.save(data, id)
        },
        addOrganization: async (organization) => {
            organization = {
                ...organization,
                uid: user?.id,
                deleted: false
            }
            return organizationStore.save(organization, null)
        },
        updateOrganization: (id, newOrg) => {
            return organizationStore.save(newOrg, id)
        },
        deleteOrganization: async (id) => {
            organizationStore.save({ deleted: true }, id)
            router.push('/organization/create');
        },
        setCurrentOrganization: async (id) => {
            setCurrent(prev => ({
                ...prev,
                organization: id
            }))
        },
        uploadContentImage: organizationStore.uploadFile
    }

    const event = {
        readEvent: () => {
            console.log('reading organization...')
            eventStore.read(user?.id, setEvent)
        },
        saveEvent: (data, id) => {
            return eventStore.save(data, id)
        },
        addEvent: async (event) => {
            event = {
                ...event,
                uid: user?.id,
                oid: current?.organization,
                deleted: false
            }
            return eventStore.save(event, null)
        },
        updateEvent: (id, newEvent) => {
            return eventStore.save(newEvent, id)
        },
        deleteEvent: async (id) => {
            eventStore.save({ deleted: true }, id)
            router.push('/event/create');
        },
        setCurrentEvent: async (id) => {
            setCurrent(prev => ({
                ...prev,
                event: id
            }))
        },
        uploadFile: eventStore.uploadFile
    }

    useEffect(() => {
        setLoading(prev => ({
            ...prev,
            user: userLoading
        }))
        if (userLoading === false && user) {
            console.log('user loading completed.')
            if (loading?.organization === true) {
                console.log('organization loading started...')
                organization.readOrganization();
                console.log('organization loading ...')
            } else {
                nProgress.done();
                console.log('organization loading finished')
            }
        }
    }, [userLoading])

    useEffect(() => {
        if (loading?.organization == false && Object.keys(organizations).length == 0)
            router.push('/organization/create')
    }, [organizations, loading?.organization])

    const isLoading = useMemo(() => {
        return loading?.user || loading?.organization || loading?.event
    }, [loading])

    return (
        <AppContext.Provider value={{
            organizations, ...organization,
            events, ...event,
            current, setCurrent,
            title, setTitle,
            activeCount, loading
        }}>
            {isLoading ? <Splash></Splash> : props.children}
        </AppContext.Provider>
    )
}
