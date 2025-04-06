/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { IMaskInput } from 'react-imask'
import './ContactForm.scss'
import { fetchCustomerData } from '/src/api/api.js'
import cities from '/src/data/citiesData.js'

const ContactForm = ({ localData, setLocalData, isCityOpen, setCityOpen }) => {
	const userId = localStorage.getItem('userId')

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

	const handleCitySelect = selectedCity => {
		setLocalData(prevData => ({
			...prevData,
			customer_city: selectedCity,
		}))
		setCityOpen(false)
	}

	const handleInputChange = field => e => {
		setLocalData(prevData => ({
			...prevData,
			[field]: e.target.value,
		}))
	}

	return (
		<form className='contact-info__form' onSubmit={e => e.preventDefault()}>
			<div className='contact-info__field'>
				<label htmlFor='name'>Ваше имя</label>
				<input
					type='text'
					className='contact-info__input'
					placeholder='Введите ваше имя'
					value={localData.customer_name}
					onChange={handleInputChange('customer_name')}
				/>
			</div>

			<div className='contact-info__field'>
				<label htmlFor='phone'>Номер телефона</label>
				<IMaskInput
					mask='+{7}(000)000-00-00'
					className='contact-info__input'
					placeholder='+7(800)___-__-__'
					value={localData.customer_phone_number}
					onAccept={value => {
						setLocalData(prevData => ({
							...prevData,
							customer_phone_number: value,
						}))
					}}
				/>
			</div>

			<div className='contact-info__field'>
				<label htmlFor='email'>E-mail</label>
				<input
					type='email'
					className='contact-info__input'
					placeholder='example@mail.com'
					value={localData.customer_email}
					onChange={handleInputChange('customer_email')}
				/>
			</div>

			<div className='contact-info__field'>
				<label htmlFor='contact-info__city'>Город</label>
				<div className='contact-info__dropdown'>
					<div
						className='contact-info__dropdown-selection'
						onClick={() => setCityOpen(!isCityOpen)}
					>
						<span>{localData.customer_city || 'Выберите город'}</span>
						<img
							src='/src/assets/icons/arrow-down-svgrepo-com.svg'
							className={`arrow ${isCityOpen ? 'open' : ''}`}
							alt='toggle'
						/>
					</div>
					{isCityOpen && (
						<ul className='contact-info__dropdown-list'>
							{cities.map(city => (
								<li
									key={city}
									className='contact-info__dropdown-item'
									onClick={() => handleCitySelect(city)}
								>
									{city}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</form>
	)
}

export default ContactForm
