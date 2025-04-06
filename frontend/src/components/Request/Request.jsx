/* eslint-disable react/prop-types */
import './Request.scss'

function Request({ data, activeTab, onCancel }) {
	const {
		organization_short_name,
		city_name,
		service_detail_name,
		street_name,
		house_number,
		date_service,
		service_cost,
		status,
	} = data

	const address = `${city_name}, ${street_name}, д. ${house_number}`
	const date = new Date(date_service)
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
			className={`request__card ${status === 'COMPLETED' ? 'done' : 'planned'}`}
		>
			<p>
				<strong>Услуга:</strong> {service_detail_name}
			</p>
			<p>
				<strong>Организация:</strong> {organization_short_name}
			</p>
			<p>
				<strong>Адрес:</strong> {address}
			</p>
			<p>
				<strong>Дата:</strong> {formattedDate}
			</p>
			<p>
				<strong>Время:</strong> {formattedTime}
			</p>
			<p>
				<strong>Цена:</strong> {service_cost}
			</p>
			<p>
				<strong>Статус:</strong> {statusTranslation[status]}
			</p>
			{activeTab === 'Ожидает подтверждения' && status !== 'COMPLETED' && (
				<button className='request__cancel-button' onClick={onCancel}>
					Отменить запись
				</button>
			)}
		</div>
	)
}

export default Request
