import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useUser } from '/src/data/userContext'
import ContactForm from '/src/components/forms/ContactForm/ContactForm'
import './Profile.scss'

const Profile = () => {
	const { userData, updateUserData } = useUser()
	const [isCountryOpen, setCountryOpen] = useState(false)
	const [isCityOpen, setCityOpen] = useState(false)
	const [localData, setLocalData] = useState({ ...userData })

	useEffect(() => {
		document.title = 'Личный кабинет | 4inilka'
	}, [])

	const handleSave = () => {
		updateUserData('name', localData.name)
		updateUserData('birthdate', localData.birthdate)
		updateUserData('phone', localData.phone)
		updateUserData('email', localData.email)
		updateUserData('country', localData.country)
		updateUserData('city', localData.city)
	}

	return (
		<>
			<Header />
			<div className='profile__container container'>
				<h2 className='profile__title title'>Профиль</h2>
				<div className='profile__contact-info contact-info'>
					<div className='contact-info__top'>
						<h3 className='contact-info__title'>Контактная информация</h3>
						<button className='contact-info__submit' onClick={handleSave}>
							Сохранить
						</button>
					</div>
					<ContactForm
						localData={localData}
						setLocalData={setLocalData}
						isCountryOpen={isCountryOpen}
						setCountryOpen={setCountryOpen}
						isCityOpen={isCityOpen}
						setCityOpen={setCityOpen}
					/>
				</div>
			</div>
		</>
	)
}

export default Profile
