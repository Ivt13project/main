/* eslint-disable react/prop-types */
import { useState } from 'react'
import cities from '../../../data/citiesData'
import Cross from '../../Cross/Cross'
import { useUser } from '/src/data/userContext'
import './CityPopUp.scss'

const CityPopUp = ({ isVisible, onClose }) => {
	const [searchTerm, setSearchTerm] = useState('')
	const { updateUserData } = useUser()

	const filteredCities = cities.filter(city =>
		city.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleCityClick = city => {
		updateUserData('city', city)
		setSearchTerm('')
		onClose()
	}

	const handleInputChange = e => {
		setSearchTerm(e.target.value)
	}

	if (!isVisible) return null

	const handleOverlayClick = e => {
		if (e.target === e.currentTarget) {
			setSearchTerm('')
			onClose()
		}
	}

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
