import "@/src/styles/nprogress.css";
import "@/src/styles/globals.css";
import "@/src/styles/styles.css";
import "@/src/styles/fullCalendar.css";
import "@/src/styles/colorpicker.css";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

import * as React from "react";

import Router, { useRouter } from "next/router";
import { SnackbarProvider, useSnackbar } from "notistack";

import AppProvider from "@/src/context/app.js";
import { AuthContextProvider } from "@/src/context/AuthContext";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { IconButton } from "@mui/material";
import { Close as IconClose } from "@mui/icons-material";
import { Provider } from "react-redux";
import Splash from "@/src/content/Splash";
import StyleProvider from "@/src/context/StyleContext";
import ThemeProvider from "@/src/theme/ThemeProvider";
import createEmotionCache from "../config/createEmotionCache";
import store from "@/src/redux/store";
import { useEffect } from "react";

function SnackbarCloseButton({ snackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <IconClose sx={{ color: "white" }} />
    </IconButton>
  );
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const Noop = ({ children }) => <>{children}</>;

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const ContextProvider = Component.provider || Noop;
  const router = useRouter();
  const [navigating, setNavigating] = React.useState(false);
  Router.events.on("routeChangeStart", (url) => {
    // nProgress.start();
    setNavigating(true);
  });
  Router.events.on("routeChangeError", (url) => {
    // nProgress.done();
    setNavigating(false);
  });
  Router.events.on("routeChangeComplete", (url) => {
    // nProgress.done();
    setNavigating(false);
  });

  const getLayout = Component.getLayout ?? ((page) => page);
  const transition = Component.transition;

  return (
    <CacheProvider value={emotionCache}>
      <SnackbarProvider
        maxSnack={5}
        action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
      >
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <ThemeProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {!navigating ? (
            <div className={`navigating transition-container`} id="navigating"></div>
          ) : transition ? (
            transition()
          ) : (
            <Splash content={"Loading..."} />
          )}
          <Provider store={store}>
            <AppProvider>
              <AuthContextProvider>
                <StyleProvider>
                  {getLayout(
                    <ContextProvider>
                      <Component {...pageProps} />
                    </ContextProvider>
                  )}
                </StyleProvider>
              </AuthContextProvider>
            </AppProvider>
          </Provider>
        </ThemeProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
}
