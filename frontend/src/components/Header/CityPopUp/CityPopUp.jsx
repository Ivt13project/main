/* eslint-disable react/prop-types */
import { useState } from 'react'
import Cross from '../../Cross/Cross'
import { useUser } from '/src/data/userContext'
import './CityPopUp.scss'
import { updateCustomerData } from '/src/api/api.js'
import cities from '../../../data/citiesData'

const CityPopUp = ({ isVisible, onClose }) => {
	const [searchTerm, setSearchTerm] = useState('')
	const { updateUserData } = useUser()

	const filteredCities = cities.filter(city =>
		city.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleCityClick = async city => {
		try {
			const userId = localStorage.getItem('userId')
			await updateCustomerData(userId, { customer_city: city })
			updateUserData('customer_city', city)
			setSearchTerm('')
			onClose()
			window.location.reload() 
		} catch (error) {
			console.error('Ошибка при обновлении города:', error)
		}
	}

	const handleInputChange = e => {
		setSearchTerm(e.target.value)
	}

	const handleOverlayClick = e => {
		if (e.target === e.currentTarget) {
			setSearchTerm('')
			onClose()
		}
	}

	if (!isVisible) return null

	return (
		<div
			className='popup__overlay city-popup__overlay'
			onClick={handleOverlayClick}
		>
			<div
				className='popup__content city-popup__content'
				onClick={e => e.stopPropagation()}
			>
				<div className='popup__top'>
					<h3 className='popup__title'>Выберите местоположение</h3>
					<div className='popup__close'>
						<Cross
							onClose={() => {
								setSearchTerm('')
								onClose()
							}}
						/>
					</div>
				</div>
				<div className='city-selection'>
					<input
						type='text'
						placeholder='Поиск города или региона'
						value={searchTerm}
						onChange={handleInputChange}
					/>
					<ul>
						{filteredCities.map(city => (
							<li key={city} onClick={() => handleCityClick(city)}>
								{city}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default CityPopUp
