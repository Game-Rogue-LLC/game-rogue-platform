import { useEffect } from 'react';

import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import PageHeader from './PageHeader'
import PageContainer from './PageContainer'

import OrganizationSidebar from '@/content/OrganizationSidebar'
import { useAppContext } from "@/context/app"
import { useRouter } from 'next/router';

const AdminLayout = (props) => {
	const { children } = props;
	const { organizations, activeCount, readOrganization } = useAppContext();
	const router = useRouter();

	// useEffect(() => {
	// 	if (activeCount?.organization == 0)
	// 		router.push('/organization/create')
	// }, [activeCount])

	useEffect(() => {
		readOrganization()
	}, [])

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
				{activeCount?.organization > 0 ?
					<OrganizationSidebar />
					: <></>
				}
				<div style={{
					flex: 1,
					flexFlow: 'column',
					display: 'flex',
					justifyContent: 'space-between',
				}}>
					{activeCount?.organization > 0 && activeCount?.event > 0 && <Navbar />}
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

export default AdminLayout
