import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// import { getAuth } from "firebase/auth";
import { auth } from '@/lib/firebase/initFirebase';
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from '@/lib/firebase/userCookies'
import {
    signInWithPopup,
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { mapUserData } from '@/lib/firebase/mapUserData';
import store from '@/lib/firestore/collections';

// initFirebase()

const useUser = () => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    // const auth = getAuth()

    const login = async ({ email, password }) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
    }
    const googleLogin = async ({ popup }) => {
        return popup
            ? await signInWithPopup(auth, new GoogleAuthProvider())
            : await signInWithRedirect(auth, new GoogleAuthProvider());
    };
    const logout = async () => {
        try {
            await auth.signOut();
            removeUserCookie();
            router.push("/auth");
        } catch (e) {
            console.error(e.message);
        }
    }

    useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        try {
            const cancelAuthListener = auth.onIdTokenChanged(async (user) => {
                if (user) {
                    const userData = mapUserData(user);
                    const unsubscribe = store.player.getPlayerSnapshot(userData, setUser);
                    const token = await (user.getIdToken(false));
                    setUserCookie({ ...userData, token });
                    setUser({ ...userData, token });
                } else {
                    removeUserCookie()
                    setUser()
                }
                setLoading(false);
            })

            const userFromCookie = getUserFromCookie()
            if (!userFromCookie) {
                setLoading(false)
                // router.push('/auth')
                return
            }
            setUser(userFromCookie)

            return () => {
                cancelAuthListener()
            }

        } catch (error) {
            console.error(error.message);
        }
    }, [])

    return { user, setUser, login, googleLogin, logout, loading }
}

export { useUser }
