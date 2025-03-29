import { useEffect } from 'react'
import Header from '../../components/Header/Header'
import ServiceSection from '../../components/ServiceSection/ServiceSection'
import './Home.scss'

const Home = () => {
	useEffect(() => {
		document.title = 'Ремонт и обслуживание автомобилей | 4inilka'
	}, [])

	return (
		<>
			<Header />
			<main className='main'>
				<div className='main__container container'>
					<h1 className='main__title'>
						4inilka - сервис для ремонта и обслуживание <br /> автомобиля
					</h1>
					<ServiceSection />
				</div>
			</main>
		</>
	)
}

export default Home
