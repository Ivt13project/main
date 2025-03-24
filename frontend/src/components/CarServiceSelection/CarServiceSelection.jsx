import { useState } from 'react'
import './CarServiceSelection.scss'
import services from '../../data/car-servicesData'

const CarServiceSelection = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedService, setSelectedService] = useState(null)

	const toggleList = () => {
		setIsOpen(!isOpen)
	}

	const handleSelectService = service => {
		if (selectedService === service.name) {
			setSelectedService(null)
		} else {
			setSelectedService(service.name)
		}
	}

	return (
		<div className='service-selection__car-service car-service'>
			<div className='car-service__title' onClick={toggleList}>
				<span>Выберите автосервис</span>
				<img
					src='/src/assets/icons/arrow-down-svgrepo-com.svg'
					className={`arrow ${isOpen ? 'open' : ''}`}
				></img>
			</div>
			{isOpen && (
				<ul className='car-service__list'>
					{services.map((service, index) => (
						<li
							key={index}
							className={`car-service__item ${
								selectedService === service.name ? 'selected' : ''
							}`}
							onClick={() => handleSelectService(service)}
						>
							<strong>{service.name}</strong>
							<p>{service.address}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default CarServiceSelection
