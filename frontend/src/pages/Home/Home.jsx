import { useEffect } from 'react'
import Header from '../../components/Header/Header'
import Reviews from '../../components/Reviews/Reviews'
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
						4inilka - агрегатор для ремонта и обслуживания <br /> автомобиля
					</h1>
					<p className='main__sub-title'>
						4inilka — ваш надежный партнер в мире автосервиса. Мы предлагаем
						профессиональный ремонт, диагностику и комплексное обслуживание
						автомобилей любых марок. Наша цель - сделать каждую поездку
						безопасной и комфортной. Доверьте нам заботу о вашем автомобиле и
						получите уверенность в его безупречном состоянии!
					</p>
					<ServiceSection />
					<Reviews />
				</div>
			</main>
		</>
	)
}

export default Home
