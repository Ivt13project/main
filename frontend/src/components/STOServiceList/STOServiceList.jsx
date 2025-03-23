/* eslint-disable react/prop-types */
import { useState } from 'react'
import STOServiceForm from '../forms/STOServiceForm/STOServiceForm'
import STOServiceItem from './STOServiceItem/STOServiceItem'
import './STOServiceList.scss'

function STOServiceList({ services, onRemove, onUpdate, onAdd }) {
	const [isFormOpen, setFormOpen] = useState(false)
	const [selectedService, setSelectedService] = useState(null)

	const handleEdit = service => {
		setSelectedService(service)
		setFormOpen(true)
	}

	const handleAdd = () => {
		setSelectedService(null)
		setFormOpen(true)
	}

	return (
		<>
			<div className='sto-services__cards'>
				{services.map(service => (
					<STOServiceItem
						key={service.id}
						service={service}
						onRemove={onRemove}
						onEdit={() => handleEdit(service)}
					/>
				))}
			</div>
			<button className='sto-services__add-btn' onClick={handleAdd}>
				Добавить услугу
			</button>
			{isFormOpen && (
				<STOServiceForm
					onClose={() => setFormOpen(false)}
					onSubmit={data => {
						selectedService ? onUpdate(data) : onAdd(data)
						setFormOpen(false)
					}}
					initialData={selectedService}
				/>
			)}
		</>
	)
}

export default STOServiceList
