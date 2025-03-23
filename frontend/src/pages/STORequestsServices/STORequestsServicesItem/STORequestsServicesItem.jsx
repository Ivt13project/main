/* eslint-disable react/prop-types */
import './STORequestsServicesItem.scss'

const STORequestsServicesItem = ({ data, activeTab, onCancel, onConfirm }) => {
	return (
		<div
			className={`request__card ${
				data.status === 'Оказана' ? 'done' : 'planned'
			}`}
		>
			<p>
				<strong>Услуга:</strong> {data.service}
			</p>
			<p>
				<strong>Адрес:</strong> {data.address}
			</p>
			<p>
				<strong>Дата:</strong> {data.date}
			</p>
			<p>
				<strong>Время:</strong> {data.time}
			</p>
			<p>
				<strong>Цена:</strong> {data.price}₽
			</p>
			<p>
				<strong>Статус:</strong> {data.status}
			</p>
			{activeTab === 'Ожидает подтверждения' && (
				<div className='request__button-group'>
					<button className='request__confirm-button' onClick={onConfirm}>
						Подтвердить
					</button>
					<button className='request__cancel-button' onClick={onCancel}>
						Отменить
					</button>
				</div>
			)}
		</div>
	)
}

export default STORequestsServicesItem
