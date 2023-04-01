import { createContext, useEffect, useState, useContext } from 'react';
import { useUser } from '@/lib/firebase/useUser';
import nProgress from 'nprogress';
import Splash from '@/content/Splash';
import { useRouter } from 'next/router';

const initialState = {
    loading: true,
    user: null,
};

export const AuthContext = createContext(initialState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const user = useUser();
    const router = useRouter();
    // const user = {
    //     loading: false,
    //     user: {
    //         displayName: 'dragon1227',
    //         email: 'dragon99steel@gmail.com'
    //     }
    // }

    useEffect(() => {
        if (!user.loading) {
            if (!user) router.push('/auth');
        }
    }, [user]);

    return (
        <AuthContext.Provider value={user}>
            {user.loading ? <Splash content='Signing in. Please wait...'></Splash> : children}
        </AuthContext.Provider>
    )
}