/* eslint-disable react/prop-types */
import './ProfileMenuItem.scss'

const ProfileMenuItem = ({ text, href}) => {
	return (
		<li className='profile-menu__item'>
			<a className='profile-menu__link' href={href}>
				{text}
			</a>
		</li>
	)
}

export default ProfileMenuItem
