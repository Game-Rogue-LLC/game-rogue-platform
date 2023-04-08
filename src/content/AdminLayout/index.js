import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import PageHeader from './PageHeader'
import PageContainer from './PageContainer'

import OrganizationSidebar from '@/content/OrganizationSidebar'
import AppProvider from '@/context/app'
import OrganizationProvider, { useOrganizationContext } from '@/context/OrganizationContext'
import EventProvider, { useEventContext } from '@/context/EventContext'
import MatchProvider, { useMatchContext } from '@/context/MatchContext'

import { useAuthContext } from '@/src/context/AuthContext'
import { useRouter } from 'next/router'

const AdminLayout = (props) => {
	const { children } = props;
	const { activeCount: activeOrganizationCount, current: currentOrganization } = useOrganizationContext();
	const { activeCount: activeEventCount, current: currentEvent } = useEventContext();

	const { user } = useAuthContext()
	const router = useRouter()

	if (!user) {
		router.push('/auth')
		return <></>
	}

	return (
		<div style={{
			display: 'flex',
			flexFlow: 'column',
			minHeight: '100vh',
			width: '100vw',
			justifyContent: 'space-between'
		}}>
			<div>
				<Header />
			</div>
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				flex: 1
			}}>
				{activeOrganizationCount > 0 ?
					<OrganizationSidebar />
					: <></>
				}
				<div style={{
					flex: 1,
					flexFlow: 'column',
					display: 'flex',
					justifyContent: 'space-between',
				}}>
					{activeOrganizationCount > 0 && currentOrganization && activeEventCount[currentOrganization] > 0 && currentEvent && <Navbar />}
					<PageContainer>
						<PageHeader />
						{children}
					</PageContainer>
					<Footer />
				</div>
			</div>
		</div>
	)
}

const ContextProvider = (props) => {
	return (
		<AppProvider>
			<OrganizationProvider>
				<EventProvider>
					<MatchProvider>
						<AdminLayout {...props} />
					</MatchProvider>
				</EventProvider>
			</OrganizationProvider>
		</AppProvider>
	)
}

export default ContextProvider
