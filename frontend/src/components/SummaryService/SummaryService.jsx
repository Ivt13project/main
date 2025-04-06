/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router'
import './SummaryService.scss'
import { createServiceRequest } from '/src/api/api'

const SummaryService = ({
	total,
	selectedServices,
	selectedOrganizationId,
	serviceDetails,
}) => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const handleContinue = async () => {
		if (!selectedOrganizationId) {
			setError('* Не выбран автосервис.')
			return
		}

		setLoading(true)
		setError(null)

		const userId = localStorage.getItem('userId')

		if (!userId) {
			setError('Идентификатор пользователя не найден.')
			setLoading(false)
			return
		}

		const selectedServiceIds = getSelectedServiceIds(
			selectedServices,
			serviceDetails
		)

		const requests = selectedServiceIds.map(service_detail_id => ({
			customer: userId,
			organization: selectedOrganizationId,
			date_service: new Date().toISOString(),
			add_info: 'Дополнительная информация',
			service_detail_id: service_detail_id,
		}))

		try {
			for (const orderData of requests) {
				await createServiceRequest(orderData)
			}
			navigate('/applications')
		} catch (error) {
			if (error.response) {
				console.error('Ошибка при создании заявки:', error.response.data)
				setError(
					`Ошибка: ${
						error.response.data.message || 'Проверьте введенные данные.'
					}`
				)
			} else {
				setError('Ошибка отправки заявок.')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div className='service-selection__summary'>
				<span>
					Итого: <strong>{total} услуг</strong>
				</span>
				<button onClick={handleContinue} disabled={loading}>
					{loading ? 'Создание заявки...' : 'Продолжить'}
				</button>
			</div>
			{error && <p className='error-message'>{error}</p>}
		</>
	)
}

export default SummaryService

const getSelectedServiceIds = (selectedServices, serviceDetails) => {
	return Object.values(selectedServices)
		.flat()
		.map(serviceName =>
			serviceDetails.find(detail => detail.service_detail_name === serviceName)
		)
		.filter(serviceDetail => serviceDetail !== undefined)
		.map(serviceDetail => serviceDetail.id)
}
