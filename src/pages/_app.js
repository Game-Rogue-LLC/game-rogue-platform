import * as React from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../config/createEmotionCache';
import AppProvider from '@/context/app';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

import { useEffect } from 'react';

import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

import ThemeProvider from '@/theme/ThemeProvider';

import '@/styles/globals.css'
import { AuthContextProvider } from '@/context/AuthContext';

const Noop = ({ children }) => <>{children}</>;

export default function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const ContextProvider = Component.provider || Noop;
	const router = useRouter();
	Router.events.on('routeChangeStart', nProgress.start);
	Router.events.on('routeChangeError', nProgress.done);
	Router.events.on('routeChangeComplete', nProgress.done);

	useEffect(() => {
		// router.push('/organization/create')
	}, [])

	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<AppProvider>
					<AuthContextProvider>
						{getLayout(
							<ContextProvider>
								<Component {...pageProps} />
							</ContextProvider>
						)}
					</AuthContextProvider>
				</AppProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
