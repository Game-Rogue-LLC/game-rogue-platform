import { createContext, useCallback, useEffect, useState } from "react";

import store from "@/lib/firestore/collections";
import { useAuthContext } from "./AuthContext";
import { useContext } from "react";
import { useRouter } from "next/router";

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export default (props) => {
  const router = useRouter();
  const [title, setTitle] = useState(null);
  const { user } = useAuthContext();
  const [meta, setMeta] = useState(null);

  const ignoreAuthRouter = ["/rogue-tv", "/plus-plans", "/wiki", "/faqs", "/customize"];
  const ignoreAuthRegex = ["/event/[A-Za-z0-9_-]{21}/info"];

  useEffect(() => {
    store.meta.read("locked").then((res) => {
      if (res.code === "succeed") {
        setMeta(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (meta && user && user.id && _.includes(meta.allowed, user.id) === false)
      for (let i = 0; i < ignoreAuthRouter.length; i++) {
        if (router.pathname.slice(0, ignoreAuthRouter[i].length) === ignoreAuthRouter[i])
          router.push("/locked?page=" + ignoreAuthRouter[i].slice(1, ignoreAuthRouter[i].length));
      }
    // for (let i = 0; i < ignoreAuthRegex.length; i++) {
    //   if (router.pathname.match(ignoreAuthRegex[i]) != null) return true;
    // }
  }, [router, meta, user]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <AppContext.Provider
      value={{
        title,
        setTitle
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
