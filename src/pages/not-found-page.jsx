import { Link } from 'react-router-dom'

const NotFoundPage = () => {
	return (
		<div
			style={{
				width: '100%',
				height: '77vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<img src='/error.gif' alt='error' />
			<h1>Page not found</h1>
			<button className='btn btn-secondary' style={{ marginTop: '20px' }}>
				<Link to={'/'}>Home Page</Link>
			</button>
		</div>
	)
}

export default NotFoundPage
