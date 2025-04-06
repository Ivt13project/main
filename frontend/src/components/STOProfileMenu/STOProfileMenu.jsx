/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import Cross from '../Cross/Cross'
import './STOProfileMenu.scss'
import STOProfileMenuItem from './STOProfileMenuItem/STOProfileMenuItem'
import { fetchOrganizationById } from '/src/api/api'

const STOProfileMenu = ({ isOpen, onClose }) => {
	const [organizationData, setOrganizationData] = useState(null)

	const getOrganizationData = async orgId => {
		const data = await fetchOrganizationById(orgId)
		setOrganizationData(data)
	}

	useEffect(() => {
		const orgId = localStorage.getItem('orgId')
		if (orgId) {
			getOrganizationData(orgId)
		}
	}, [])

	const handleLogout = () => {
		localStorage.removeItem('orgId')
		onClose()
		window.location.href = 'http://localhost:5173/'
	}

	const getFullName = () => {
		if (organizationData) {
			const {
				responsible_person_surname,
				responsible_person_name,
				responsible_person_patronymic,
			} = organizationData
			return `${responsible_person_surname} ${responsible_person_name} ${responsible_person_patronymic}`.trim()
		}
		return ''
	}

	const getAddress = () => {
		if (
			organizationData &&
			organizationData.addresses &&
			organizationData.addresses.length > 0
		) {
			const { city_name, street_name, house_number } =
				organizationData.addresses[0]
			return `${city_name}, ${street_name}, д. ${house_number}`
		}
		return 'Адрес не указан'
	}

	return (
		<div
			className={`overlay__sto-profile-menu overlay__profile-menu ${
				isOpen ? 'open' : ''
			}`}
			onClick={onClose}
		>
			<div className='profile-menu' onClick={e => e.stopPropagation()}>
				<div className='profile-menu__content'>
					<div className='profile-menu__top'>
						<div className='profile-menu__name'>
							<img
								src='/src/assets/icons/repairing-service-svgrepo-com.svg'
								alt='Пользователь'
							/>
							<span>
								{organizationData
									? organizationData.organization_short_name
									: 'Загрузка...'}
							</span>
						</div>
						<div className='profile-menu__close' onClick={onClose}>
							<Cross onClose={onClose} />
						</div>
					</div>
					<div className='profile-menu__organization-info'>
						{organizationData ? (
							<>
								<p>
									<strong>Полное наименование:</strong>{' '}
									{organizationData.organization_full_name}
								</p>
								<p>
									<strong>Краткое наименование:</strong>{' '}
									{organizationData.organization_short_name}
								</p>
								<p>
									<strong>ИНН:</strong> {organizationData.inn}
								</p>
								<p>
									<strong>КПП:</strong> {organizationData.kpp}
								</p>
								<p>
									<strong>Контактное лицо:</strong> {getFullName()}
								</p>
								<p>
									<strong>Телефон:</strong>{' '}
									{organizationData.responsible_person_phone_number}
								</p>
								<p>
									<strong>Адрес:</strong> {getAddress()}
								</p>
							</>
						) : (
							<p>Загрузка информации о организации...</p>
						)}
					</div>
					<ul className='profile-menu__list'>
						<STOProfileMenuItem
							img={'/src/assets/icons/request-quote-svgrepo-com.svg'}
							text={'Заявки на оказание услуг'}
							href={'/request/services'}
						/>
						<STOProfileMenuItem
							img={'/src/assets/icons/calendar-lines-pen-svgrepo-com.svg'}
							text={'Календарь занятости'}
							href={'/calendar/STO'}
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

export default STOProfileMenu
