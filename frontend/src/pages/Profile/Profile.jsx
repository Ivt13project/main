import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import './Profile.scss'
import { updateCustomerData } from '/src/api/api.js'
import ContactForm from '/src/components/forms/ContactForm/ContactForm'
import { useUser } from '/src/data/userContext'

const Profile = () => {
	const { userData, updateUserData } = useUser()
	const [isCityOpen, setCityOpen] = useState(false)
	const [localData, setLocalData] = useState({ ...userData })

	useEffect(() => {
		document.title = 'Личный кабинет | 4inilka'
	}, [])

	const handleSave = async () => {
		try {
			const userId = localStorage.getItem('userId')
			console.log('Данные для обновления:', localData)
			await updateCustomerData(userId, localData)
			updateUserData('customer_name', localData.customer_name)
			updateUserData('customer_phone_number', localData.customer_phone_number)
			updateUserData('customer_email', localData.customer_email)
			updateUserData('customer_city', localData.customer_city)

			window.location.reload()
		} catch (error) {
			console.error('Ошибка при сохранении данных:', error)
		}
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
						isCityOpen={isCityOpen}
						setCityOpen={setCityOpen}
					/>
				</div>
			</div>
		</>
	)
}

export default Profile
