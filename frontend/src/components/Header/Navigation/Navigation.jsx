import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import STOProfileMenu from '../../STOProfileMenu/STOProfileMenu'
import './Navigation.scss'

const Navigation = () => {
	const [isMenuOpen, setMenuOpen] = useState(false)
	const navigate = useNavigate()

	const isLoggedIn = Boolean(localStorage.getItem('orgId'))

	const handleProfileClick = event => {
		if (isLoggedIn) {
			event.preventDefault()
			setMenuOpen(true)
		}
	}

	const handleServiceClick = event => {
		event.preventDefault()
		const userId = localStorage.getItem('userId')
		if (!userId) {
			navigate('/register')
		} else {
			navigate('/search/service')
		}
	}

	const handleCloseMenu = () => {
		setMenuOpen(false)
	}

	return (
		<nav className='header__nav nav'>
			<ul className='nav__list'>
				<li className='nav__item'>
					<NavLink
						className='nav__link'
						onClick={handleServiceClick}
						to='/search/service'
					>
						Обслуживание автомобилей
					</NavLink>
				</li>
				<li className='nav__item'>
					<NavLink
						onClick={handleProfileClick}
						className='nav__link'
						to='/partnership'
					>
						Партнерство
					</NavLink>
				</li>
			</ul>
			<STOProfileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
		</nav>
	)
}

export default Navigation
