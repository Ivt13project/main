import { useEffect } from 'react'
import Header from '../../components/Header/Header'

const Home = () => {
	useEffect(() => {
		document.title = 'Ремонт и обслуживание автомобилей | ITishka'
	}, [])
	return (
		<>
			<Header />
			<main className='main'>
				<h1>Главная страница</h1>
			</main>
		</>
	)
}

export default Home
