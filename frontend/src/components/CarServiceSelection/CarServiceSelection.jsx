import { useEffect, useState } from 'react'
import './CarServiceSelection.scss'
import { fetchOrganizations } from '/src/api/api.js'

const CarServiceSelection = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedService, setSelectedService] = useState(null)
	const [organizations, setOrganizations] = useState([])

	const toggleList = () => {
		setIsOpen(!isOpen)
	}

	const handleSelectService = service => {
		if (selectedService === service.organization_short_name) {
			setSelectedService(null)
		} else {
			setSelectedService(service.organization_short_name)
		}
	}

	useEffect(() => {
		const loadOrganizations = async () => {
			try {
				const data = await fetchOrganizations()
				setOrganizations(data)
			} catch (error) {
				console.error('Failed to load organizations:', error)
			}
		}

		loadOrganizations()
	}, [])

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
					{organizations.map((service, index) => (
						<li
							key={index}
							className={`car-service__item ${
								selectedService === service.organization_short_name
									? 'selected'
									: ''
							}`}
							onClick={() => handleSelectService(service)}
						>
							<strong>{service.organization_short_name}</strong>
							<p>
								{service.addresses.length > 0
									? service.addresses
											.map(
												address =>
													`${address.city_name}, ${address.street_name}, ${address.house_number}`
											)
											.join(', ')
									: 'Нет адресов'}
							</p>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default CarServiceSelection
