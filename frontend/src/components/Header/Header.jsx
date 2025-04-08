import { useState } from 'react'
import Buttons from './Buttons/Buttons'
import './Header.scss'
import Logo from './Logo/Logo'
import Navigation from './Navigation/Navigation'
import ContactsPopUp from './ContactsPopUp/ContactsPopUp'
import CityPopUp from './CityPopUp/CityPopUp'

const Header = () => {
	const [isContactPopUpVisible, setContactPopUpVisible] = useState(false)
	const [isCityPopUpVisible, setCityPopUpVisible] = useState(false)
	const [selectedCity, setSelectedCity] = useState(() => {
		return localStorage.getItem('selectedCity') || ''
	})

	const handleContactButtonClick = () => {
		setContactPopUpVisible(true)
	}

	const handleCityButtonClick = () => {
		setCityPopUpVisible(true)
	}

	const handleClose = () => {
		setContactPopUpVisible(false)
		setCityPopUpVisible(false)
	}

	const handleCitySelect = city => {
		setSelectedCity(city)
		localStorage.setItem('selectedCity', city)
	}

	return (
		<header className='header'>
			<div className='header__container container'>
				<div className='header__left'>
					<Logo />
					<Navigation />
				</div>
				<Buttons
					onContactClick={handleContactButtonClick}
					onCityClick={handleCityButtonClick}
					selectedCity={selectedCity}
				/>
				<ContactsPopUp
					isVisible={isContactPopUpVisible}
					onClose={handleClose}
				/>
				<CityPopUp
					isVisible={isCityPopUpVisible}
					onClose={handleClose}
					onCitySelect={handleCitySelect} 
				/>
			</div>
		</header>
	)
}

export default Header
