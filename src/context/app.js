import { useRouter } from 'next/router';
import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { useAuthContext } from './AuthContext';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext)

export default (props) => {
    const router = useRouter();
    const user = useAuthContext()
    const [title, setTitle] = useState(null);

    useEffect(() => {
        if (!user) {
            router.push('/auth');
        }
    }, [user])

    return (
        <AppContext.Provider value={{
            title, setTitle
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
