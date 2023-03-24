import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

const AppContext = createContext({});

export default (props) => {
    const router = useRouter();
    const [organizations, setOrganizations] = useState([]);
    const [currentOrganization, setCurrentOrganization] = useState(null);
    const [activeCount, setActiveCount] = useState(0);
    const [title, setTitle] = useState(null);

    const addOrganization = async (newOrg) => {
        await setOrganizations([
            ...organizations,
            {
                ...newOrg,
                deleted: false
            }
        ])
        setCurrentOrganization(newOrg);
    }

    const addEvent = (event) => {
        let temp = [...organizations];
        temp.forEach((val, i) => {
            if (val._id == event.organization) {
                if (!val.events) val.events = [];
                val.events.push(event);
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
            if (organizations[i]._id == currentOrganization?._id) {
                setCurrentOrganization({...organizations[i]});
                break;
            }
        }
        const ac = (organizations.filter((val, i) => val.deleted === false)).length;
        setActiveCount(ac);
    }, [organizations])

    return (
        <AppContext.Provider value={{ organizations, addOrganization, addEvent, currentOrganization, setCurrentOrganization, updateOrganization, deleteOrganization, title, setTitle, activeCount }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext };