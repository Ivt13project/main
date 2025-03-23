/* eslint-disable react/prop-types */
import './STOServiceItem.scss'

function STOServiceItem({ service, onRemove, onEdit }) {
	return (
		<div className='sto-service__card'>
			<p>
				<strong>Категория: </strong>
				{service.category}
			</p>
			<p>
				<strong>Название: </strong>
				{service.title}
			</p>
			<p>
				<strong>Цена: </strong>
				{service.price} ₽
			</p>
			<p>
				<strong>Описание: </strong>
				{service.description}
			</p>
			<div className='sto-service__card-btns'>
				<button
					className='sto-service__card-btn'
					onClick={() => onEdit(service)}
				>
					Редактировать
				</button>
				<button
					className='sto-service__card-btn'
					onClick={() => onRemove(service.id)}
				>
					Удалить
				</button>
			</div>
		</div>
	)
}

export default STOServiceItem
