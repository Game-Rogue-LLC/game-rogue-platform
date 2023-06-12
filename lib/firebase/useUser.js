import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect
} from "firebase/auth";
import { getUserFromCookie, removeUserCookie, setUserCookie } from "@/lib/firebase/userCookies";
import { useEffect, useState } from "react";

import { auth } from "@/lib/firebase/initFirebase";
import { mapUserData } from "@/lib/firebase/mapUserData";
import store from "@/lib/firestore/collections";
import { useRouter } from "next/router";

// import { getAuth } from "firebase/auth";

// initFirebase()

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // const auth = getAuth()

  const signUp = async ({ email, password }) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  };
  const login = async ({ email, password }) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  };
  const googleLogin = async ({ popup }) => {
    return popup
      ? await signInWithPopup(auth, new GoogleAuthProvider())
      : await signInWithRedirect(auth, new GoogleAuthProvider());
  };
  const logout = async () => {
    try {
      await auth.signOut();
      removeUserCookie();
      router.push("/");
    } catch (e) {
      console.warn(e.message);
    }
  };

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    try {
      const cancelAuthListener = auth.onIdTokenChanged(async (user) => {
        if (user) {
          const userData = mapUserData(user);
          // auth.currentUser.sendEmailVerification({
          //   url: 'https://localhost:3000/?email=' + user.email,
          //   handleCodeInApp: true
          // }).then(() => {
          //   alert('Verification was sent to ' + user.email);
          // }).catch(() => {
          //   alert('No such email');
          // })
          const unsubscribe = store.player.getPlayerSnapshot(userData, setUser);
          const token = await user.getIdToken(false);
          setUserCookie({ ...userData, token });
          setUser({ ...userData, token });
        } else {
          removeUserCookie();
          setUser(null);
        }
        setLoading(false);
      });

      const userFromCookie = getUserFromCookie();
      if (!userFromCookie) {
        setLoading(false);
        // router.push('/auth')
        return;
      }
      setUser(userFromCookie);

      return () => {
        cancelAuthListener();
      };
    } catch (error) {
      // console.warn("my error" + error.message);
    }
  }, []);

  return { user, setUser, login, googleLogin, logout, loading, signUp };
};

export { useUser };
