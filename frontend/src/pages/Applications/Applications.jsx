import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Request from '../../components/Request/Request'
import './Applications.scss'
import { fetchRequests, cancelRequest } from '/src/api/api'

const Applications = () => {
	useEffect(() => {
		document.title = 'Заявки | 4inilka'
		loadRequests()
	}, [])

	const [activeTab, setActiveTab] = useState('Ожидает подтверждения')
	const [data, setData] = useState({
		'Ожидает подтверждения': [],
		'В работе': [],
		Выполненные: [],
		Отмененные: [],
	})

	const loadRequests = async () => {
		try {
			const requests = await fetchRequests()
			setData({
				'Ожидает подтверждения': requests.filter(r => r.status === 'PENDING'),
				'В работе': requests.filter(r => r.status === 'IN_PROGRESS'),
				Выполненные: requests.filter(r => r.status === 'COMPLETED'),
				Отмененные: requests.filter(r => r.status === 'CANCELLED'),
			})
		} catch (error) {
			console.error('Не удалось загрузить заявки:', error)
		}
	}

	const handleMoveToCancelled = async requestId => {
		try {
			await cancelRequest(requestId)
			loadRequests()
		} catch (error) {
			console.error('Не удалось отменить заявку:', error)
		}
	}

	return (
		<>
			<Header />
			<div className='applications__container container'>
				<h2 className='applications__title title'>Заявки</h2>
				<div className='applications__tabs'>
					{Object.keys(data).map(tab => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`applications__tab-button ${
								activeTab === tab ? 'active' : ''
							}`}
						>
							{tab}
						</button>
					))}
				</div>
				<div className='requests__cards'>
					{data[activeTab] && data[activeTab].length > 0 ? (
						data[activeTab].map(request => (
							<Request
								key={request.id}
								data={request}
								activeTab={activeTab}
								onCancel={() => handleMoveToCancelled(request.id)}
							/>
						))
					) : (
						<p className='applications__no-applications'>
							Нет заявок в этой категории
						</p>
					)}
				</div>
			</div>
		</>
	)
}

export default Applications
