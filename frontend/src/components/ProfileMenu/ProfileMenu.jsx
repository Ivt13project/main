/* eslint-disable react/prop-types */
import Cross from '../Cross/Cross'
import './ProfileMenu.scss'
import ProfileMenuItem from './ProfileMenuItem/ProfileMenuItem'

const ProfileMenu = ({ isOpen, onClose }) => {
	return (
		<div
			className={`overlay__profile-menu ${isOpen ? 'open' : ''}`}
			onClick={onClose}
		>
			<div className='profile-menu' onClick={e => e.stopPropagation()}>
				<div className='profile-menu__content'>
					<div className='profile-menu__top'>
						<div className='profile-menu__name'>
							<img src='/src/assets/icons/user-svgrepo-com.svg' alt='' />
							<span>Никита</span>
						</div>
						<div className='profile-menu__close' onClick={onClose}>
							<Cross onClose={onClose} />
						</div>
					</div>
					<ul className='profile-menu__list'>
						<ProfileMenuItem text={'Профиль'} href={''} />
						<ProfileMenuItem text={'Поиск услуг'} href={'/search/service'} />
						<ProfileMenuItem text={'Заявки'} href={'/applications'} />
						<ProfileMenuItem text={'Избранные автосервисы'} href={''} />
					</ul>
					<button className='profile-menu__exit'>Выйти</button>
				</div>
			</div>
		</div>
	)
}

export default ProfileMenu
