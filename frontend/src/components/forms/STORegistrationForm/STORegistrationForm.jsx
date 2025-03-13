import { useState } from 'react'
import PasswordInput from '../PasswordInput/PasswordInput'
import PhoneInput from '../PhoneInput/PhoneInput'
import SubmitButton from '../SubmitButton/SubmitButton'
import './STORegistrationForm.scss'

const STORegistrationForm = () => {
	const [formData, setFormData] = useState({
		phone: '',
		inn: '',
		contactName: '',
		legalName: '',
		actualName: '',
		city: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [errors, setErrors] = useState({})

	const handleInputChange = e => {
		const { name, value } = e.target

		if (name === 'contactName') {
			const regex = /^[а-яА-ЯёЁ\s]*$/
			if (!regex.test(value)) {
				return
			}
		}

		if (name === 'inn') {
			const regex = /^\d{0,12}$/
			if (!regex.test(value)) {
				return
			}
		}

		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		const newErrors = {}

		Object.keys(formData).forEach(key => {
			if (!formData[key]) {
				newErrors[key] = '* Это обязательное поле'
			}
		})

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = '* Пароли должны совпадать'
		}

		setErrors(newErrors)

		if (Object.keys(newErrors).length === 0) {
			console.log('Форма регистрации СТО отправлена')
		}
	}

	return (
		<div>
			<form className='sto-registration__form form' onSubmit={handleSubmit}>
				<h1 className='form__title'>Заполните данные СТО</h1>
				<div className='form__wrapper'>
					<div className='form__input-wrapper'>
						<PhoneInput
							value={formData.phone}
							onChange={handleInputChange}
							name='phone'
							error={errors.phone}
						/>
					</div>

					<div className='form__input-wrapper'>
						<input
							type='text'
							placeholder='ИНН'
							name='inn'
							value={formData.inn}
							onChange={handleInputChange}
							className={`form__input ${errors.inn ? 'input-error' : ''}`}
						/>
						{errors.inn && <span className='error-message'>{errors.inn}</span>}
					</div>

					<div className='form__input-wrapper'>
						<input
							type='text'
							placeholder='ФИО контакта'
							name='contactName'
							value={formData.contactName}
							onChange={handleInputChange}
							className={`form__input ${
								errors.contactName ? 'input-error' : ''
							}`}
						/>
						{errors.contactName && (
							<span className='error-message'>{errors.contactName}</span>
						)}
					</div>

					<div className='form__input-wrapper'>
						<input
							type='text'
							placeholder='Юридическое название компании'
							name='legalName'
							value={formData.legalName}
							onChange={handleInputChange}
							className={`form__input ${errors.legalName ? 'input-error' : ''}`}
						/>
						{errors.legalName && (
							<span className='error-message'>{errors.legalName}</span>
						)}
					</div>

					<div className='form__input-wrapper'>
						<input
							type='text'
							placeholder='Фактическое название'
							name='actualName'
							value={formData.actualName}
							onChange={handleInputChange}
							className={`form__input ${
								errors.actualName ? 'input-error' : ''
							}`}
						/>
						{errors.actualName && (
							<span className='error-message'>{errors.actualName}</span>
						)}
					</div>

					<div className='form__input-wrapper'>
						<input
							type='text'
							placeholder='Город'
							name='city'
							value={formData.city}
							onChange={handleInputChange}
							className={`form__input ${errors.city ? 'input-error' : ''}`}
						/>
						{errors.city && (
							<span className='error-message'>{errors.city}</span>
						)}
					</div>

					<div className='form__input-wrapper'>
						<input
							type='email'
							placeholder='Почта'
							name='email'
							value={formData.email}
							onChange={handleInputChange}
							className={`form__input ${errors.email ? 'input-error' : ''}`}
						/>
						{errors.email && (
							<span className='error-message'>{errors.email}</span>
						)}
					</div>

					<div className='form__input-wrapper'>
						<PasswordInput
							placeholder='Пароль'
							value={formData.password}
							onChange={handleInputChange}
							name='password'
							error={errors.password}
						/>
					</div>

					<div className='form__input-wrapper'>
						<PasswordInput
							placeholder='Повторите пароль'
							value={formData.confirmPassword}
							onChange={handleInputChange}
							name='confirmPassword'
							error={errors.confirmPassword}
						/>
					</div>
				</div>

				<SubmitButton text={'Далее'} />

				<p className='form__text'>
					Регистрируясь, вы принимаете{' '}
					<a href='/user-agreement'>Пользовательское соглашение</a> и даете
					согласие на{' '}
					<a href='/personal-data-processing'>Обработку персональных данных</a>
				</p>
			</form>
		</div>
	)
}

export default STORegistrationForm
