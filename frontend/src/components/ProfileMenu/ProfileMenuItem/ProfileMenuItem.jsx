/* eslint-disable react/prop-types */
import './ProfileMenuItem.scss'

const ProfileMenuItem = ({ text, href, img }) => {
	return (
		<li className='profile-menu__item'>
			<a className='profile-menu__link' href={href}>
				<img src={img} alt='' />
				{text}
			</a>
		</li>
	)
}

export default ProfileMenuItem
