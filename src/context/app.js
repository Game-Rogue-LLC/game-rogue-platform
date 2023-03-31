import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { db } from '@/lib/firebase/initFirebase'
import { addDoc, doc, getDoc, setDoc, collection, getDocs, query, where } from "firebase/firestore"
import { useUser } from '@/libfirebase/useUser';

const AppContext = createContext({});

export default (props) => {
    const router = useRouter();
    const { user } = useUser();
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
            ...organization,
            uid: user?.id,
            deleted: false
        }
        sendData('organization', organization, null)
            .then(async (data) => {
                console.log(data)
                // await setOrganizations([
                //     ...organizations,
                //     {
                //         ...organization
                //     }
                // ])
                // setCurrent(prev => ({
                //     ...prev,
                //     organization: { ...organization }
                // }));
            })
            .catch(err => {
                console.error(err)
            })
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
            event: { ...event }
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

    const readData = async (_collection) => {
        try {
            const dbRef = collection(db, _collection)
            const q = query(dbRef, where('uid', '==', user?.id));
            await getDocs(q)
                .then(docsSnap => {
                    let temp = []
                    docsSnap.forEach(doc => {
                        temp.push(doc.data())
                    })
                    console.log(temp)
                    setOrganizations(temp)
                })
                .catch(err => {
                    console.error(err)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const sendData = async (_collection, data, id) => {
        try {
            if (id) {
                const docRef = doc(db, _collection, id);
                await setDoc(docRef, { ...data });
                const docSnap = await getDoc(db, _collection, id);
                return docSnap.data()
            } else {
                const dbRef = collection(db, _collection);
                const docRef = await addDoc(dbRef, { ...data });
                const docSnap = await getDoc(db, _collection, docRef.id)
                return docSnap.data()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        for (let i = 0; i < organizations.length; i++) {
            if (organizations[i].id == current.organization?.id) {
                setCurrent(prev => ({
                    ...prev,
                    organization: { ...organizations[i] }
                }));
                break;
            }
        }
        const aoc = (organizations.filter((val, i) => val.deleted === false)).length,
            aec = (events.filter((val, i) => val.deleted === false)).length
        console.log(aoc, aec)
        setActiveCount({
            organization: aoc,
            event: aec
        });
    }, [organizations, events])

    return (
        <AppContext.Provider value={{ organizations, addOrganization, events, addEvent, current, setCurrent, updateOrganization, deleteOrganization, title, setTitle, activeCount, readData, sendData }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext };