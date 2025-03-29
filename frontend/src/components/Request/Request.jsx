/* eslint-disable react/prop-types */
import './Request.scss'

function Request({ data, activeTab, onCancel }) {
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
				<strong>Организация:</strong> {data.organization}
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
			{activeTab === 'Ожидает подтверждения' && data.status !== 'Оказана' && (
				<button className='request__cancel-button' onClick={onCancel}>
					Отменить запись
				</button>
			)}
		</div>
	)
}

export default Request
