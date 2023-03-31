import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
import { useContext } from 'react';
import organizationStore from '@/lib/firestore/collections/organization';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext)

export default (props) => {
    const router = useRouter();
    const { user } = useAuthContext();
    const [organizations, setOrganizations] = useState({});
    const [events, setEvents] = useState([]);
    const [current, setCurrent] = useState({
        organization: null,
        event: null
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

    const setOrganization = (data, activeCount) => {
        setOrganizations(data);
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
            organizationStore.save(data, id)
        },
        addOrganization: async (organization) => {
            organization = {
                ...organization,
                uid: user?.id,
                deleted: false
            }
            organizationStore.save(organization, null)
        },
        updateOrganization: (id, newOrg) => {
            organizationStore.save(newOrg, id)
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
        }
    }

    return (
        <AppContext.Provider value={{
            organizations, ...organization,
            events, addEvent,
            current, setCurrent,
            title, setTitle,
            activeCount
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
