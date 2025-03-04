import { useState } from 'react'
import Buttons from './Buttons/Buttons'
import './Header.scss'
import Logo from './Logo/Logo'
import Navigation from './Navigation/Navigation'
import PopUp from './PopUp/PopUp'

const Header = () => {
	const [isPopUpVisible, setPopUpVisible] = useState(false)

	const handleButtonClick = () => {
		setPopUpVisible(true)
	}

	const handleClose = () => {
		setPopUpVisible(false)
	}

	return (
		<header className='header'>
			<div className='header__container container'>
				<div className='header__left'>
					<Logo />
					<Navigation />
				</div>
				<Buttons onClick={handleButtonClick} />
				<PopUp isVisible={isPopUpVisible} onClose={handleClose} />
			</div>
		</header>
	)
}

export default Header
