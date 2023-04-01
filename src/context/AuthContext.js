import { createContext, useEffect, useState, useContext } from 'react';
import { useUser } from '@/lib/firebase/useUser';
import nProgress from 'nprogress';
import Splash from '@/content/Splash';

const initialState = {
    loading: true,
    user: null,
};

export const AuthContext = createContext(initialState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const user = useUser();
    // const user = {
    //     loading: false,
    //     user: {
    //         displayName: 'dragon1227',
    //         email: 'dragon99steel@gmail.com'
    //     }
    // }

    useEffect(() => {
        // if (user.loading) nProgress.start()
    }, [user]);

    return (
        <AuthContext.Provider value={user}>
            {user.loading ? <Splash></Splash> : children}
        </AuthContext.Provider>
    )
}