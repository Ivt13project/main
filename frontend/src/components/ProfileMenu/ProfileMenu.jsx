/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import Cross from '../Cross/Cross'
import './ProfileMenu.scss'
import ProfileMenuItem from './ProfileMenuItem/ProfileMenuItem'
import { fetchCustomerData } from '/src/api/api.js'
import { useUser } from '/src/data/userContext'

const ProfileMenu = ({ isOpen, onClose }) => {
	const { userData } = useUser()
	const userId = localStorage.getItem('userId')
	const [localData, setLocalData] = useState({ ...userData })

	useEffect(() => {
		const fetchData = async () => {
			if (userId) {
				try {
					const userData = await fetchCustomerData(userId)
					setLocalData({
						customer_name: userData.customer_name || '',
						customer_email: userData.customer_email || '',
						customer_phone_number: userData.customer_phone_number || '',
						customer_city: userData.customer_city || '',
					})
				} catch (error) {
					console.error('Ошибка при получении данных:', error)
				}
			}
		}

		fetchData()
	}, [userId, setLocalData])

	const handleLogout = () => {
		localStorage.removeItem('userId')
		onClose()
		window.location.href = 'http://localhost:5173/'
	}

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
							<span>{localData.customer_name}</span>
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
					<button className='profile-menu__exit' onClick={handleLogout}>
						Выйти
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProfileMenu
