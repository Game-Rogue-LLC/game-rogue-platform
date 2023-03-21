import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import PageHeader from './PageHeader'
import PageContainer from './PageContainer'

const AdminLayout = (props) => {
	const {children} = props;
	return (
		<div style={{
			display: 'flex',
			flexFlow: 'column',
			minHeight: '100vh',
			justifyContent: 'space-between'
		}}>
			<div style={{
				
			}}>
				<Header/>
				<Navbar/>
			</div>
			<PageContainer>
				<PageHeader/>
				{children}
			</PageContainer>
			<Footer/>
		</div>
	)
}

export default AdminLayout
