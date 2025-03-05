/* eslint-disable react/prop-types */
import Cross from '../Cross/Cross'
import './ProfileMenu.scss'
import ProfileMenuItem from './ProfileMenuItem/ProfileMenuItem'
import { useUser } from '/src/data/userContext'

const ProfileMenu = ({ isOpen, onClose }) => {
	const { userData } = useUser()

	return (
		<div
			className={`overlay__profile-menu ${isOpen ? 'open' : ''}`}	
			onClick={onClose}
		>
			<div className='profile-menu' onClick={e => e.stopPropagation()}>
				<div className='profile-menu__content'>
					<div className='profile-menu__top'>
						<div className='profile-menu__name'>
							<img
								src='/src/assets/icons/user-svgrepo-com.svg'
								alt='Пользователь'
							/>
							<span>{userData.name}</span>
						</div>
						<div className='profile-menu__close' onClick={onClose}>
							<Cross onClose={onClose} />
						</div>
					</div>
					<ul className='profile-menu__list'>
						<ProfileMenuItem
							img={'/src/assets/icons/profile-circle-svgrepo-com.svg'}
							text={'Профиль'}
							href={'/profile'}
						/>
						<ProfileMenuItem
							img={'/src/assets/icons/service-svgrepo-com.svg'}
							text={'Поиск услуг'}
							href={'/search/service'}
						/>
						<ProfileMenuItem
							img={'/src/assets/icons/request-quote-svgrepo-com.svg'}
							text={'Заявки'}
							href={'/applications'}
						/>
					</ul>
					<button className='profile-menu__exit'>Выйти</button>
				</div>
			</div>
		</div>
	)
}

export default ProfileMenu
