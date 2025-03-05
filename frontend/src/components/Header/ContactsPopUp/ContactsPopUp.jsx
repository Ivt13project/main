/* eslint-disable react/prop-types */
import Cross from '../../Cross/Cross'
import './ContactsPopUp.scss'
import ContactsPopUpItem from './ContactsPopUpItem/ContactsPopUpItem'

const PopUp = ({ isVisible, onClose }) => {
	if (!isVisible) return null

	const handleOverlayClick = e => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return (
		<div className='popup__overlay' onClick={handleOverlayClick}>
			<div className='popup__content' onClick={e => e.stopPropagation()}>
				<div className='popup__top'>
					<h3 className='popup__title'>Контакты</h3>
					<div className='popup__close'>
						<Cross onClose={onClose} />
					</div>
				</div>
				<ul className='popup__list'>
					<ContactsPopUpItem
						icon={'/src/assets/icons/phone-svgrepo-com.svg'}
						alt={'Телефон'}
						text={'8 (800) 666-66-66'}
						href={'tel:880066666'}
					/>
					<ContactsPopUpItem
						icon={'/src/assets/icons/telegram-svgrepo-com.svg'}
						alt={'Телеграм'}
						text={'Telegram'}
						href={''}
					/>
					<ContactsPopUpItem
						icon={'/src/assets/icons/email-1-svgrepo-com.svg'}
						alt={'Почта'}
						text={'support@4inilka.com'}
						href={''}
					/>
				</ul>
			</div>
		</div>
	)
}

export default PopUp
