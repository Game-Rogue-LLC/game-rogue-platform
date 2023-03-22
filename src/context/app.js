import { createContext, useState } from 'react';

const AppContext = createContext({});

export default (props) => {
    const [organizations, setOrganizations] = useState([]);

    const addOrganization = (newOrg) => {
        setOrganizations([
            ...organizations,
            newOrg
        ])
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

    return (
        <AppContext.Provider value={{ organizations, addOrganization, addEvent }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext };