import { useState } from 'react'
import NameInput from '../NameInput/NameInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import PhoneInput from '../PhoneInput/PhoneInput'
import SubmitButton from '../SubmitButton/SubmitButton'
import './RegisterForm.scss'

const RegisterForm = () => {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [phone, setPhone] = useState('')

	const [errors, setErrors] = useState({
		name: '',
		password: '',
		confirmPassword: '',
		phone: '',
	})

	const handleSubmit = e => {
		e.preventDefault()
		const newErrors = {
			name: '',
			password: '',
			confirmPassword: '',
			phone: '',
		}

		if (!name) newErrors.name = '* Это обязательное поле'
		if (!password) newErrors.password = '* Это обязательное поле'
		if (password !== confirmPassword)
			newErrors.confirmPassword = '* Пароли не совпадают'
		if (!phone) newErrors.phone = '* Это обязательное поле'

		setErrors(newErrors)

		if (
			!newErrors.name &&
			!newErrors.password &&
			!newErrors.confirmPassword &&
			!newErrors.phone
		) {
			console.log('Форма отправлена')
		}
	}

	return (
		<div>
			<form className='register__form form' onSubmit={handleSubmit}>
				<h1 className='form__title'>Регистрация</h1>
				<div>
					<NameInput
						placeholder={'Имя'}
						value={name}
						onChange={e => setName(e.target.value)}
						error={errors.name}
					/>
				</div>
				<div>
					<PhoneInput
						value={phone}
						onChange={e => setPhone(e.target.value)}
						error={errors.phone}
					/>
				</div>
				<div>
					<PasswordInput
						placeholder={'Пароль'}
						value={password}
						onChange={e => setPassword(e.target.value)}
						error={errors.password}
					/>
				</div>
				<div>
					<PasswordInput
						placeholder={'Повторите пароль'}
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						error={errors.confirmPassword}
					/>
				</div>
				<SubmitButton text={'Зарегистрироваться'} />

				<p className='form__text'>
					У вас уже есть аккаунт?{' '}
					<a href='/login' id='switchToRegister'>
						Войти
					</a>
				</p>

				<p className='form__policy'>
					Регистрируясь, вы принимаете{' '}
					<a href='/terms' className='form__link'>
						Пользовательское соглашение
					</a>
					<br />и даете согласие на{' '}
					<a href='/privacy' className='form__link'>
						Обработку персональных данных
					</a>
				</p>
			</form>
		</div>
	)
}

export default RegisterForm
