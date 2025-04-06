import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import './STORequestsServices.scss'
import STORequestsServicesItem from './STORequestsServicesItem/STORequestsServicesItem'
import { fetchSTORequests, updateSTORequestStatus } from '/src/api/api'

const STATUS_MAP = {
	PENDING: 'Ожидает подтверждения',
	IN_PROGRESS: 'В работе',
	COMPLETED: 'Выполненные',
	CANCELLED: 'Отмененные',
}

const STORequestsServices = () => {
	const [activeTab, setActiveTab] = useState('Ожидает подтверждения')
	const [data, setData] = useState({
		'Ожидает подтверждения': [],
		'В работе': [],
		Выполненные: [],
		Отмененные: [],
	})

	useEffect(() => {
		document.title = 'Заявки на оказание услуг | 4inilka'
		loadRequests()
	}, [])

	const loadRequests = async () => {
		try {
			const requests = await fetchSTORequests()

			const categorizedData = {
				'Ожидает подтверждения': [],
				'В работе': [],
				Выполненные: [],
				Отмененные: [],
			}

			requests.forEach(request => {
				const readableStatus = STATUS_MAP[request.status]
				if (readableStatus) {
					categorizedData[readableStatus].push(request)
				}
			})

			setData(categorizedData)
		} catch (error) {
			console.error('Ошибка при загрузке заявок:', error)
		}
	}

	const handleStatusChange = async (id, newStatus) => {
		try {
			await updateSTORequestStatus(id, newStatus)
			await loadRequests()
		} catch (error) {
			console.error('Ошибка при обновлении статуса:', error)
		}
	}

	return (
		<>
			<Header />
			<div className='applications__container container'>
				<h2 className='applications__title title'>Заявки на оказание услуг</h2>
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
					{data[activeTab]?.length > 0 ? (
						data[activeTab].map(request => (
							<STORequestsServicesItem
								key={request.id}
								data={request}
								activeTab={activeTab}
								onCancel={() => handleStatusChange(request.id, 'CANCELLED')}
								onConfirm={() => handleStatusChange(request.id, 'IN_PROGRESS')}
								onComplete={() => handleStatusChange(request.id, 'COMPLETED')}
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

export default STORequestsServices
