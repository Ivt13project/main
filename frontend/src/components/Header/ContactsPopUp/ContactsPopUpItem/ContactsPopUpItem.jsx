/* eslint-disable react/prop-types */
import './ContactsPopUpItem.scss'

const PopUpItem = ({icon, alt, href, text}) => {
	return (
		<li className='popup__item'>
			<a className='popup__link' href={href}>
				<img src={icon} alt={alt} />
				{text}
			</a>
		</li>
	)
}

export default PopUpItem
