import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

const AppContext = createContext({});

export default (props) => {
    const router = useRouter();
    const [organizations, setOrganizations] = useState([]);
    const [events, setEvents] = useState([]);
    const [current, setCurrent] = useState({
        organization: null,
        event: null
    });
    const [activeCount, setActiveCount] = useState({
        organization: 0,
        event: 0
    });
    const [title, setTitle] = useState(null);

    const addOrganization = async (organization) => {
        organization = {
			_id: new Date().getTime(),
            ...organization,
            deleted: false
        }
        await setOrganizations([
            ...organizations,
            {
                ...organization
            }
        ])
        setCurrent(prev => ({
            ...prev,
            organization: {...organization}
        }));
    }

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
            event: {...event}
        }));
        let temp = [...organizations];
        temp.forEach((val, i) => {
            if (val._id == event?.organization) {
                if (!val.events) val.events = [];
                val.events.push(event?._id);
            }
        })
        setOrganizations(temp);
    }

    const updateOrganization = (id, newOrg) => {
        let temp = [...organizations];
        temp.forEach((val, i) => {
            if (val._id == id) {
                val = {
                    ...val,
                    ...newOrg
                }
                temp[i] = val;
            }
        })
        setOrganizations(temp);
    }

    const deleteOrganization = async (id) => {
        let temp = [...organizations]
        organizations.forEach((val, i) => {
            if (val._id == id) {
                val = {
                    ...val,
                    deleted: true
                }
            }
            temp[i] = val;
        })
        await setOrganizations(temp);
        router.push('/organization/create');
    }

    useEffect(() => {
        for (let i = 0; i < organizations.length; i++) {
            if (organizations[i]._id == current.organization?._id) {
                setCurrent(prev => ({
                    ...prev,
                    organization: {...organizations[i]}
                }));
                break;
            }
        }
        const aoc = (organizations.filter((val, i) => val.deleted === false)).length,
            aec = (events.filter((val, i) => val.deleted === false)).length
        setActiveCount({
            organization: aoc,
            event: aec
        });
    }, [organizations, events])

    return (
        <AppContext.Provider value={{ organizations, addOrganization, events, addEvent, current, setCurrent, updateOrganization, deleteOrganization, title, setTitle, activeCount }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext };