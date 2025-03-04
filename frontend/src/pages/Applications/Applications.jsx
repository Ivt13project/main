import { useState } from 'react'
import Header from '../../components/Header/Header'
import Request from '../../components/Request/Request'
import requestsData from '../../data/requestsData'
import './Applications.scss'

const Applications = () => {
	const [activeTab, setActiveTab] = useState('Ожидает подтверждения')
	const [data, setData] = useState(requestsData)

	const handleCancelRequest = (tab, index) => {
		setData(prevData => ({
			...prevData,
			[tab]: prevData[tab].filter((_, i) => i !== index),
		}))
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
						data[activeTab].map((request, index) => (
							<Request
								key={index}
								data={request}
								onCancel={() => handleCancelRequest(activeTab, index)}
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
