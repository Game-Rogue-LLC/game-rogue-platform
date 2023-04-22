import { createContext, useEffect, useState, useContext, useMemo } from 'react';
import { useUser } from '@/lib/firebase/useUser';
import nProgress from 'nprogress';
import Splash from '@/src/content/Splash';
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

    const ignoreAuthRouter = ['/', '/auth']

    const ignoreAuth = useMemo(() => {
        return ignoreAuthRouter.includes(router.pathname)
    }, [router])

    useEffect(() => {
        if (!user.loading && !user.user && (!ignoreAuth)) {
            router.push('/auth')
        }
    }, [user.loading, user.user, router])

    return (
        <AuthContext.Provider value={user}>
            {(user.loading) ?
                <Splash content='Signing in. Please wait...'></Splash>
                : (user.user || ignoreAuth) ?
                    children
                    :
                    <Splash content='Signing in. Please wait...'></Splash>
            }
        </AuthContext.Provider>
    )
}