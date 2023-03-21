import * as React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../config/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

import ThemeProvider from '@/theme/ThemeProvider';

const Noop = ({ children }) => <>{children}</>;

export default function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const ContextProvider = Component.provider || Noop;
	Router.events.on('routeChangeStart', nProgress.start);
	Router.events.on('routeChangeError', nProgress.done);
	Router.events.on('routeChangeComplete', nProgress.done);

	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<CacheProvider value={emotionCache}>
		<Head>
			<meta name="viewport" content="initial-scale=1, width=device-width" />
		</Head>
		<ThemeProvider>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			{getLayout(
				<ContextProvider>
					<Component {...pageProps} />
				</ContextProvider>
			)}
		</ThemeProvider>
		</CacheProvider>
	);
}
