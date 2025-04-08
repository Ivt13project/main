/* eslint-disable react/prop-types */
import './STORequestsServicesItem.scss'

const STORequestsServicesItem = ({
	data,
	activeTab,
	onCancel,
	onConfirm,
	onComplete,
}) => {
	const address = `${data.city_name}, ${data.street_name}, д. ${data.house_number}`
	const date = new Date(data.date_service)
	const formattedDate = date.toLocaleDateString('ru-RU')
	const formattedTime = date.toLocaleTimeString('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
	})
	const statusTranslation = {
		PENDING: 'Ожидает подтверждения',
		IN_PROGRESS: 'В работе',
		COMPLETED: 'Завершено',
		CANCELLED: 'Отменено',
	}
	return (
		<div
			className={`request__card ${
				data.status === 'COMPLETED' ? 'done' : 'planned'
			}`}
		>
			<p>
				<strong>Услуга:</strong> {data.service_detail_name}
			</p>
			<p>
				<strong>Клиент:</strong> {data.customer_name}
			</p>
			<p>
				<strong>Телефон клиента:</strong> {data.customer_phone_number}
			</p>
			<p>
				<strong>Адрес:</strong> {address}
			</p>
			<p>
				<strong>Дата: </strong>
				{formattedDate}
			</p>
			<p>
				<strong>Время:</strong> {formattedTime}
			</p>
			<p>
				<strong>Цена:</strong> {data.service_cost}₽
			</p>
			<p>
				<strong>Статус: </strong>
				{statusTranslation[data.status]}
			</p>

			{activeTab === 'Ожидает подтверждения' && (
				<div className='request__button-group'>
					<button className='request__confirm-button' onClick={onConfirm}>
						Подтвердить
					</button>
					<button className='request__confirm-button' onClick={onCancel}>
						Отменить
					</button>
				</div>
			)}

			{activeTab === 'В работе' && (
				<div className='request__button-group'>
					<button className='request__confirm-button' onClick={onComplete}>
						Завершить
					</button>
				</div>
			)}
		</div>
	)
}

export default STORequestsServicesItem
