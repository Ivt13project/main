import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import STOrequestsData from '../../data/STOrequsetsData'
import './STORequestsServices.scss'
import STORequestsServicesItem from './STORequestsServicesItem/STORequestsServicesItem'

const STORequestsServices = () => {
	useEffect(() => {
		document.title = 'Заявки на оказание услуг | 4inilka'
	}, [])

	const [activeTab, setActiveTab] = useState('Ожидает подтверждения')
	const [data, setData] = useState(STOrequestsData)

	const handleMoveToInProgress = requestId => {
		const requestToMove = data['Ожидает подтверждения'].find(
			request => request.id === requestId
		)

		if (requestToMove) {
			setData(prevData => ({
				...prevData,
				'Ожидает подтверждения': prevData['Ожидает подтверждения'].filter(
					request => request.id !== requestId
				),
				'В работе': [
					...prevData['В работе'],
					{ ...requestToMove, status: 'Работает' },
				],
			}))
		}
	}

	const handleMoveToCancelled = requestId => {
		const activeRequests = data[activeTab]
		const requestToCancel = activeRequests.find(
			request => request.id === requestId
		)

		if (requestToCancel) {
			setData(prevData => ({
				...prevData,
				[activeTab]: prevData[activeTab].filter(
					request => request.id !== requestId
				),
				Отмененные: [
					...prevData['Отмененные'],
					{ ...requestToCancel, status: 'Отменена' },
				],
			}))
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
					{data[activeTab].length > 0 ? (
						data[activeTab].map(request => (
							<STORequestsServicesItem
								key={request.id}
								data={request}
								activeTab={activeTab} 
								onCancel={() => handleMoveToCancelled(request.id)}
								onConfirm={() => handleMoveToInProgress(request.id)}
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
