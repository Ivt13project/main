import { useState } from 'react'
import PasswordInput from '../PasswordInput/PasswordInput'
import PhoneInput from '../PhoneInput/PhoneInput'
import SubmitButton from '../SubmitButton/SubmitButton'
import './LoginForm.scss'

const LoginForm = () => {
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)
	const [errors, setErrors] = useState({
		phone: '',
		password: '',
	})

	const handleSubmit = e => {
		e.preventDefault()
		const newErrors = {
			phone: '',
			password: '',
		}

		if (!phone) newErrors.phone = '* Это обязательное поле'
		if (!password) newErrors.password = '* Это обязательное поле'

		setErrors(newErrors)

		if (!newErrors.phone && !newErrors.password) {
			console.log('Форма входа отправлена')
		}
	}

	return (
		<div>
			<form className='login__form form' onSubmit={handleSubmit}>
				<h1 className='form__title'>Войти в аккаунт</h1>
				<PhoneInput
					value={phone}
					onChange={e => setPhone(e.target.value)}
					error={errors.phone}
				/>
				<PasswordInput
					placeholder={'Пароль'}
					value={password}
					onChange={e => setPassword(e.target.value)}
					error={errors.password}
				/>

				<div className='form__options'>
					<label className='form__checkbox'>
						<input
							type='checkbox'
							checked={rememberMe}
							onChange={() => setRememberMe(!rememberMe)}
						/>
						Запомнить меня
					</label>
					<a href='/forgot-password' className='form__forgot'>
						Забыли пароль?
					</a>
				</div>

				<SubmitButton text={'Войти'} />

				<p className='form__text'>
					Нет аккаунта?{' '}
					<a href='/register' id='switchToRegister'>
						Зарегистрироваться
					</a>
				</p>
			</form>
		</div>
	)
}

export default LoginForm
