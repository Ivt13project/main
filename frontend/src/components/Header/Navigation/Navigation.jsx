/* eslint-disable react/prop-types */
import { useState } from 'react'
import STOProfileMenu from '../../STOProfileMenu/STOProfileMenu'
import './Navigation.scss'

const Navigations = () => {
	const [isMenuOpen, setMenuOpen] = useState(false)
	const isLogged = true

	const handleProfileClick = event => {
		if (isLogged) {
			event.preventDefault()
			setMenuOpen(true)
		}
	}

	const handleCloseMenu = () => {
		setMenuOpen(false)
	}

	return (
		<nav className='header__nav nav'>
			<ul className='nav__list'>
				<li className='nav__item'>
					<a className='nav__link' href='/search/service'>
						Обслуживание автомобилей
					</a>
				</li>
				<li className='nav__item'>
					<a
						onClick={handleProfileClick}
						className='nav__link'
						href='/partnership'
					>
						Партнерство
					</a>
				</li>
			</ul>
			<STOProfileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
		</nav>
	)
}

export default Navigations
