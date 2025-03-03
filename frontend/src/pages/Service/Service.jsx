import { useEffect } from 'react'
import Header from '../../components/Header/Header'
import './Service.scss'

const Service = () => {
	useEffect(() => {
		document.title = 'Поиск и обслуживание авто | 4inilka'
	}, [])
	return (
		<div>
			<Header />
			<h1>Страница для клиентов</h1>
		</div>
	)
}

export default Service
