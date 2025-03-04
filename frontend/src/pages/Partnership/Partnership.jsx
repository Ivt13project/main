import { useEffect } from 'react'
import Header from '../../components/Header/Header'
import './Partnership.scss'

const Partnership = () => {
	useEffect(() => {
		document.title = 'Подключение автосервисов | 4inilka'
	}, [])
	return (
		<>
			<Header />
			<h1>Страница для организациям-партнеров</h1>
		</>
	)
}

export default Partnership
