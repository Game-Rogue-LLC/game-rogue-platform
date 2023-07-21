import { createContext, useContext, useEffect, useMemo, useState } from "react";

import Splash from "@/src/content/Splash";
import { useRouter } from "next/router";
import { useUser } from "@/lib/firebase/useUser";

const initialState = {
  loading: true,
  user: null
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

  const ignoreAuthRouter = [
    "/",
    "/auth",
    "/event",
    "/event/upcoming",
    "/event/ongoing",
    "/event/completed",
    "/event/[eid]",
    "/team/[tid]",
    "/match/upcoming",
    "/match/[mid]/info",
    "/user/[uid]/info"
  ];
  const ignoreAuthRegex = ["/event/[A-Za-z0-9_-]{21}/info"];

  const ignoreAuth = useMemo(() => {
    if (ignoreAuthRouter.includes(router.pathname)) return true;
    // for (let i = 0; i < ignoreAuthRegex.length; i++) {
    //   if (router.pathname.match(ignoreAuthRegex[i]) != null) return true;
    // }
    return false;
  }, [router]);

  useEffect(() => {
    if (!user.loading && !user.user && !ignoreAuth) {
      router.push("/auth");
    }
  }, [user.loading, user.user, router, ignoreAuth]);

  return (
    <AuthContext.Provider value={user}>
      {user.loading ? (
        <Splash content="Signing in. Please wait..."></Splash>
      ) : user.user || ignoreAuth ? (
        children
      ) : (
        <Splash content="Signing in. Please wait..."></Splash>
      )}
    </AuthContext.Provider>
  );
};
