/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './CarServiceSelection.scss'
import { fetchOrganizations } from '/src/api/api.js'

const CarServiceSelection = ({ setSelectedOrganizationId }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedService, setSelectedService] = useState(null)
	const [organizations, setOrganizations] = useState([])

	const toggleList = () => {
		setIsOpen(!isOpen)
	}

	const handleSelectService = service => {
		const serviceId = selectedService === service.id ? null : service.id
		setSelectedService(serviceId)
		setSelectedOrganizationId(serviceId)
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

	const userData = JSON.parse(localStorage.getItem('userData')) || {}
	const selectedCity = userData.customer_city

	const filteredOrganizations = organizations.filter(org =>
		org.addresses.some(address => address.city_name === selectedCity)
	)

	return (
		<div className='service-selection__car-service car-service'>
			<div className='car-service__title' onClick={toggleList}>
				<span>Выберите автосервис</span>
				<img
					src='/src/assets/icons/arrow-down-svgrepo-com.svg'
					className={`arrow ${isOpen ? 'open' : ''}`}
					alt='toggle'
				/>
			</div>
			{isOpen && (
				<ul className='car-service__list'>
					{filteredOrganizations.map((service, index) => (
						<li
							key={index}
							className={`car-service__item ${
								selectedService === service.id ? 'selected' : ''
							}`}
							onClick={() => handleSelectService(service)}
						>
							<strong>{service.organization_short_name}</strong>
							<p>
								{service.addresses.length > 0
									? service.addresses
											.map(
												address =>
													`${address.city_name}, ул. ${address.street_name}, д. ${address.house_number}`
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
