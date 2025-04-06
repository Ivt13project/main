import { useState } from 'react'
import { useNavigate } from 'react-router'
import PasswordInput from '../PasswordInput/PasswordInput'
import STOPhoneInput from '../STOPhoneInput/STOPhoneInput'
import SubmitButton from '../SubmitButton/SubmitButton'
import './STORegistrationForm.scss'
import { registerOrganization } from '/src/api/api'

const STORegistrationForm = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		organization_full_name: '',
		organization_short_name: '',
		inn: '',
		kpp: '',
		ogrn: '',
		responsible_person_email: '',
		responsible_person_phone_number: '',
		responsible_person_surname: '',
		responsible_person_name: '',
		responsible_person_patronymic: '',
		password: '',
		confirmPassword: '',
		addresses: [],
	})
	const [errors, setErrors] = useState({})
	const [globalError, setGlobalError] = useState('')

	const handleInputChange = e => {
		const { name, value } = e.target

		if (name === 'inn' && !/^\d{0,10}$/.test(value)) return
		if (name === 'ogrn' && !/^\d{0,13}$/.test(value)) return
		if (name === 'kpp' && !/^\d{0,9}$/.test(value)) return

		if (name === 'responsible_person_email' && /[а-яА-ЯёЁ]/.test(value)) {
			return
		}

		if (
			[
				'responsible_person_surname',
				'responsible_person_name',
				'responsible_person_patronymic',
			].includes(name)
		) {
			if (!/^[а-яА-ЯёЁ\s]*$/.test(value) && value !== '') return
		}

		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setGlobalError('')
		const newErrors = {}

		Object.keys(formData).forEach(key => {
			if (!formData[key] && key !== 'addresses') {
				newErrors[key] = '* Это обязательное поле'
			}
		})

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = '* Пароли должны совпадать'
		}

		setErrors(newErrors)

		if (Object.keys(newErrors).length === 0) {
			try {
				const data = await registerOrganization(formData)
				console.log('Форма регистрации успешно отправлена:', data)
				navigate('/login/STO')
			} catch (error) {
				console.error('Ошибка при регистрации:', error)
				setGlobalError(error.message)
			}
		}
	}

	return (
		<div>
			<form className='sto-registration__form form' onSubmit={handleSubmit}>
				<h1 className='form__title'>Заполните данные СТО</h1>
				<div className='form__wrapper'>
					<div className='form__input-wrapper'>
						<input
							type='text'
							placeholder='Полное название организации'
							name='organization_full_name'
							value={formData.organization_full_name}
							onChange={handleInputChange}
							className={`form__input ${
								errors.organization_full_name ? 'input-error' : ''
							}`}
						/>
						{errors.organization_full_name && (
							<span className='error-message'>
								{errors.organization_full_name}
							</span>
						)}
					</div>

					<div className='form__input-wrapper'>
						<input
							type='text'
							placeholder='Краткое название организации'
							name='organization_short_name'
							value={formData.organization_short_name}
							onChange={handleInputChange}
							className={`form__input ${
								errors.organization_short_name ? 'input-error' : ''
							}`}
						/>
						{errors.organization_short_name && (
							<span className='error-message'>
								{errors.organization_short_name}
							</span>
						)}
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
							placeholder='КПП'
							name='kpp'
							value={formData.kpp}
							onChange={handleInputChange}
							className={`form__input ${errors.kpp ? 'input-error' : ''}`}
						/>
						{errors.kpp && <span className='error-message'>{errors.kpp}</span>}
					</div>

					<div className='form__input-wrapper'>
						<input
							type='text'
							placeholder='ОГРН'
							name='ogrn'
							value={formData.ogrn}
							onChange={handleInputChange}
							className={`form__input ${errors.ogrn ? 'input-error' : ''}`}
						/>
						{errors.ogrn && (
							<span className='error-message'>{errors.ogrn}</span>
						)}
					</div>

					<div className='form__input-wrapper'>
						<STOPhoneInput
							value={formData.responsible_person_phone_number}
							onChange={handleInputChange}
							name='responsible_person_phone_number'
							error={errors.responsible_person_phone_number}
							className={`form__input ${
								errors.responsible_person_phone_number ? 'input-error' : ''
							}`}
						/>
						{errors.responsible_person_phone_number && (
							<span className='error-message'>
								{errors.responsible_person_phone_number}
							</span>
						)}
					</div>

					<div className='form__input-wrapper'>
						<input
							type='email'
							placeholder='Email ответственного лица'
							name='responsible_person_email'
							value={formData.responsible_person_email}
							onChange={handleInputChange}
							className={`form__input ${
								errors.responsible_person_email ? 'input-error' : ''
							}`}
						/>
						{errors.responsible_person_email && (
							<span className='error-message'>
								{errors.responsible_person_email}
							</span>
						)}
					</div>

					<div className='form__input-wrapper'>
						<input
							type='text'
							placeholder='Фамилия ответственного лица'
							name='responsible_person_surname'
							value={formData.responsible_person_surname}
							onChange={handleInputChange}
							className={`form__input ${
								errors.responsible_person_surname ? 'input-error' : ''
							}`}
						/>
						{errors.responsible_person_surname && (
							<span className='error-message'>
								{errors.responsible_person_surname}
							</span>
						)}
					</div>

					<div className='form__input-wrapper'>
						<input
							type='text'
							placeholder='Имя ответственного лица'
							name='responsible_person_name'
							value={formData.responsible_person_name}
							onChange={handleInputChange}
							className={`form__input ${
								errors.responsible_person_name ? 'input-error' : ''
							}`}
						/>
						{errors.responsible_person_name && (
							<span className='error-message'>
								{errors.responsible_person_name}
							</span>
						)}
					</div>

					<div className='form__input-wrapper'>
						<input
							type='text'
							placeholder='Отчество ответственного лица'
							name='responsible_person_patronymic'
							value={formData.responsible_person_patronymic}
							onChange={handleInputChange}
							className={`form__input ${
								errors.responsible_person_patronymic ? 'input-error' : ''
							}`}
						/>
						{errors.responsible_person_patronymic && (
							<span className='error-message'>
								{errors.responsible_person_patronymic}
							</span>
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

				{globalError && (
					<p className='error-message global-error'>{globalError}</p>
				)}

				<SubmitButton text={'Далее'} />

				<p className='form__text'>
					У вас уже есть партнерский аккаунт?{' '}
					<a href='/login/STO' id='switchToRegister'>
						Войти
					</a>
				</p>

				<p className='form__policy'>
					Регистрируясь, вы принимаете{' '}
					<a className='form__link' href='/user-agreement'>
						Пользовательское соглашение
					</a>{' '}
					и даете согласие на{' '}
					<a className='form__link' href='/personal-data-processing'>
						Обработку персональных данных
					</a>
				</p>
			</form>
		</div>
	)
}

export default STORegistrationForm
