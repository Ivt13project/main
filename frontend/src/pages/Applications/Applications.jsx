import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Request from '../../components/Request/Request'
import requestsData from '../../data/requestsData'
import './Applications.scss'

const Applications = () => {
	useEffect(() => {
		document.title = 'Заявки | 4inilka'
	}, [])

	const [activeTab, setActiveTab] = useState('Ожидает подтверждения')
	const [data, setData] = useState(requestsData)

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
					{data[activeTab].length > 0 ? (
						data[activeTab].map(request => (
							<Request
								key={request.id}
								data={request}
								activeTab={activeTab} // Передаем активную вкладку как пропс
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
