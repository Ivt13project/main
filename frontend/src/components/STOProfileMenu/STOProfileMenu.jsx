/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import Cross from '../Cross/Cross'
import './STOProfileMenu.scss'
import STOProfileMenuItem from './STOProfileMenuItem/STOProfileMenuItem'

const STOProfileMenu = ({ isOpen, onClose }) => {
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
							<span>ТехноСервис</span>
						</div>
						<div className='profile-menu__close' onClick={onClose}>
							<Cross onClose={onClose} />
						</div>
					</div>
					<div className='profile-menu__organization-info'>
						<p>
							<strong>Полное наименование:</strong> ООО "ТехноСервис"
						</p>
						<p>
							<strong>Краткое наименование: </strong>ТехноСервис
						</p>
						<p>
							<strong>ИНН:</strong> 1234567890
						</p>
						<p>
							<strong>КПП:</strong> 987654321
						</p>
						<p>
							<strong>Контактное лицо:</strong> Петров Петр Петрович
						</p>
						<p>
							<strong>Телефон:</strong> 8 (999) 111-22-33
						</p>
					</div>
					<ul className='profile-menu__list'>
						<STOProfileMenuItem
							img={'/src/assets/icons/request-quote-svgrepo-com.svg'}
							text={'Заявки на оказание слуг'}
							href={'/request/services'}
						/>
						<STOProfileMenuItem
							img={'/src/assets/icons/service-bell-svgrepo-com.svg'}
							text={'Услуги организации'}
							href={'/services/STO'}
						/>
						<STOProfileMenuItem
							img={'/src/assets/icons/calendar-lines-pen-svgrepo-com.svg'}
							text={'Календарь занятости'}
							href={'/calendar/STO'}
						/>
					</ul>
					<button className='profile-menu__exit'>Выйти</button>
				</div>
			</div>
		</div>
	)
}

export default STOProfileMenu
