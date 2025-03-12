import { useEffect } from 'react'
import Header from '../../components/Header/Header'
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
						4inilka - сервис для ремонта и обслуживание автомобиля
					</h1>
				</div>
			</main>
		</>
	)
}

export default Home
