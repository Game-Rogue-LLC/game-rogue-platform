import { useRouter } from 'next/router';
import { createContext, useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { useAuthContext } from './AuthContext';
import store from '@/lib/firestore/collections';
import { nanoid } from 'nanoid';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext)

export default (props) => {
    const router = useRouter();
    const [title, setTitle] = useState(null);

    return (
        <AppContext.Provider value={{
            title, setTitle
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
