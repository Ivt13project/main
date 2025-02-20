import './Navigation.scss'

const Navigations = () => {
	return (
		<nav className='header__nav nav'>
			<ul className='nav__list'>
				<li className='nav__item'>
					<a className='nav__link' href='/service'>
						Обслуживание автомобилей
					</a>
				</li>
				<li className='nav__item'>
					<a className='nav__link' href='/partnership'>
						Партнерство
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default Navigations
