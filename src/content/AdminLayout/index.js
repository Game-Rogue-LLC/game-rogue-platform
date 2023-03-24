import { useContext, useEffect } from 'react';

import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import PageHeader from './PageHeader'
import PageContainer from './PageContainer'

import OrganizationSidebar from '@/content/OrganizationSidebar'
import { AppContext } from "@/context/app"

const AdminLayout = (props) => {
	const { children } = props;
	const { organizations } = useContext(AppContext);

	return (
		<div style={{
			display: 'flex',
			flexFlow: 'column',
			minHeight: '100vh',
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
				{organizations?.length > 0 ?
					<OrganizationSidebar />
					: <></>
				}
				<div style={{
					flex: 1,
					flexFlow: 'column',
					display: 'flex',
					justifyContent: 'space-between',
				}}>
					{organizations?.length > 0 && <Navbar />}
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
