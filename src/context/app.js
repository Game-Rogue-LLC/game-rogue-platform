import { useRouter } from 'next/router';
import { createContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useAuthContext } from './AuthContext';
import { useContext } from 'react';
import organizationStore from '@/lib/firestore/collections/organization';
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

    // Add Event
    const addEvent = async (event) => {
        event = {
            ...event,
            deleted: false
        }
        await setEvents([
            ...events,
            {
                ...event
            }
        ])
        setCurrent(prev => ({
            ...prev,
            event: { ...event }
        }));
        let temp = [...organizations];
        temp.forEach((val, i) => {
            if (val.id == event?.organization) {
                if (!val.events) val.events = [];
                val.events.push(event?.id);
            }
        })
        setOrganizations(temp);
    }

    const setOrganization = async (data, activeCount) => {
        await setOrganizations(data);
        setLoading(prev => ({
            ...prev,
            organization: false
        }))
        setActiveCount(prev => ({
            ...prev,
            organization: activeCount
        }))
    }

    const organization = {
        readOrganization: () => {
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
        readEvent: () => { },
        saveEvent: () => { },
        addEvent: async () => { },
        updateEvent: (id, newEvent) => { },
        deleteEvent: async (id) => { },
        setCurrentEvent: async (id) => {
            setCurrent(prev => ({
                ...prev,
                event: id
            }))
        }
    }

    const changeLoading = useCallback(() => {
        setLoading(prev => ({
            ...prev,
            user: userLoading
        }))
        if (userLoading === false && user) {
            if (loading?.organization === true) {
                organization.readOrganization();
            } else {
                nProgress.done();
            }
        }
    }, [userLoading])

    useEffect(() => {
        changeLoading()
    }, [changeLoading])

    const isLoading = useMemo(() => {
        return loading?.user || loading?.organization || loading?.event
    }, [loading])

    return (
        <AppContext.Provider value={{
            organizations, ...organization,
            events, addEvent,
            current, setCurrent,
            title, setTitle,
            activeCount
        }}>
            {isLoading ? <Splash></Splash> : props.children}
        </AppContext.Provider>
    )
}
