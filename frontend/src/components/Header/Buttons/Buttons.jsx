/* eslint-disable react/prop-types */
import { useState } from 'react'
import ProfileMenu from '../../ProfileMenu/ProfileMenu'
import './Buttons.scss'
import { useUser } from '/src/data/userContext'

const Buttons = ({ onContactClick, onCityClick }) => {
	const [isMenuOpen, setMenuOpen] = useState(false)
	const { userData } = useUser()
	const isLoggedIn = JSON.parse(localStorage.getItem('customer'));
	
	const handleProfileClick = () => {
		setMenuOpen(true)
	}

	const handleCloseMenu = () => {
		setMenuOpen(false)
	}

	return (
		<>
			<div className='header__buttons'>
				<div className='header__button-city' onClick={onCityClick}>
					<button className='header__button'>
						<img
							src='/src/assets/icons/location-pin-alt-1-svgrepo-com.svg'
							alt='Выбор города'
						/>
					</button>
					{userData.city && (
						<span className='selected-city'>{userData.city}</span>
					)}
				</div>
				<button className='header__button' onClick={onContactClick}>
					<img src='/src/assets/icons/phone-svgrepo-com.svg' alt='Контакты' />
					Контакты
				</button>
				{isLoggedIn ? (
					<button className='header__button' onClick={handleProfileClick}>
						<img
							src='/src/assets/icons/profile-circle-svgrepo-com.svg'
							alt='Профиль'
						/>
					</button>
				) : (
					<a className='header__button' href='/login'>
						<img src='/src/assets/icons/login-svgrepo-com.svg' alt='Войти' />
						Войти
					</a>
				)}
			</div>
			<ProfileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
		</>
	)
}

export default Buttons
