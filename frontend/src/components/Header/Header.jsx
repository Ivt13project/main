import Buttons from './Buttons/Buttons'
import './Header.scss'
import Logo from './Logo/Logo'
import Navigation from './Navigation/Navigation'

const Header = () => {
	return (
		<header className='header'>
			<div className='header__container container'>
				<Logo />
				<Navigation />
				<Buttons />
			</div>
		</header>
	)
}

export default Header
