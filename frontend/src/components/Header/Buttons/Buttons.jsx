/* eslint-disable react/prop-types */
import { useState } from 'react'
import ProfileMenu from '../../ProfileMenu/ProfileMenu'
import './Buttons.scss'

const Buttons = ({ onClick }) => {

	const [isMenuOpen, setMenuOpen] = useState(false)
	const isLoggedIn = true

	const handleProfileClick = () => {
		setMenuOpen(true)
	}

	const handleCloseMenu = () => {
		setMenuOpen(false)
	}

	return (
		<>
			<div className='header__buttons'>
				<button className='header__button' onClick={onClick}>
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
