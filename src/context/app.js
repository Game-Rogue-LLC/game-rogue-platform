import { useRouter } from 'next/router';
import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { useAuthContext } from './AuthContext';
import store from '@/lib/firestore/collections';
import { nanoid } from 'nanoid';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext)

export default (props) => {
    const router = useRouter();
    const user = useAuthContext()
    const [title, setTitle] = useState(null);

    useEffect(() => {
        if (!user.user) {
            router.push('/auth');
        } else {
            store.player.exists(user.user.id)
                .then(res => {
                    if (res.code === 'failed') {
                        const { token, ...rest } = user.user;
                        const newPlayer = {
                            _id: nanoid(5),
                            ...rest,
                            gender: 0,
                            residency: '',
                            deleted: false
                        }
                        store.player.save(user.user.id, newPlayer)
                            .then(res => {
                                if (res.code === 'succeed') {
                                    // alert(res.message)
                                }
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [user.user])

    return (
        <AppContext.Provider value={{
            title, setTitle
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
