/* eslint-disable react/prop-types */
import { IMaskInput } from 'react-imask'
import './ContactForm.scss'
import cities from '/src/data/citiesData.js'

const ContactForm = ({
	localData,
	setLocalData,
	isCountryOpen,
	setCountryOpen,
	isCityOpen,
	setCityOpen,
}) => {
	const handleCitySelect = selectedCity => {
		setLocalData(prevData => ({ ...prevData, city: selectedCity }))
		setCityOpen(false)
	}

	const handleCountrySelect = selectedCountry => {
		setLocalData(prevData => ({ ...prevData, country: selectedCountry }))
		setCountryOpen(false)
	}

	const handleNameChange = e => {
		const value = e.target.value
		const regex = /^[а-яА-ЯёЁ]+$/ // ТОЛЬКО русские буквы
		if (regex.test(value) || value === '') {
			setLocalData(prevData => ({
				...prevData,
				name: value,
			}))
		}
	}

	return (
		<form className='contact-info__form'>
			<div className='contact-info__field'>
				<label htmlFor='name'>Ваше имя</label>
				<input
					type='text'
					className='contact-info__input'
					placeholder='Введите ваше имя'
					value={localData.name}
					onChange={handleNameChange}
				/>
			</div>

			<div className='contact-info__field'>
				<label htmlFor='birthdate'>Дата рождения</label>
				<IMaskInput
					mask='00.00.0000'
					className='contact-info__input'
					placeholder='ДД.ММ.ГГГГ'
					value={localData.birthdate}
					onAccept={value =>
						setLocalData(prevData => ({ ...prevData, birthdate: value }))
					}
				/>
			</div>

			<div className='contact-info__field'>
				<label htmlFor='phone'>Номер телефона</label>
				<IMaskInput
					mask='+{7}(000)000-00-00'
					className='contact-info__input'
					placeholder='+7(800)___-__-__'
					value={localData.phone}
					onAccept={value =>
						setLocalData(prevData => ({ ...prevData, phone: value }))
					}
				/>
			</div>

			<div className='contact-info__field'>
				<label htmlFor='email'>E-mail</label>
				<input
					type='email'
					className='contact-info__input'
					placeholder='example@mail.com'
					value={localData.email}
					onChange={e =>
						setLocalData(prevData => ({
							...prevData,
							email: e.target.value,
						}))
					}
				/>
			</div>

			<div className='contact-info__field'>
				<label htmlFor='contact-info__country'>Страна</label>
				<div className='contact-info__dropdown'>
					<div
						className='contact-info__dropdown-selection'
						onClick={() => setCountryOpen(!isCountryOpen)}
					>
						<span>{localData.country}</span>
						<img
							src='/src/assets/icons/arrow-down-svgrepo-com.svg'
							className={`arrow ${isCountryOpen ? 'open' : ''}`}
							alt='toggle'
						/>
					</div>
					{isCountryOpen && (
						<ul className='contact-info__dropdown-list'>
							<li
								className='contact-info__dropdown-item'
								onClick={() => handleCountrySelect('Россия')}
							>
								Россия
							</li>
						</ul>
					)}
				</div>
			</div>

			<div className='contact-info__field'>
				<label htmlFor='contact-info__city'>Город</label>
				<div className='contact-info__dropdown'>
					<div
						className='contact-info__dropdown-selection'
						onClick={() => setCityOpen(!isCityOpen)}
					>
						<span>{localData.city || 'Выберите город'}</span>
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
