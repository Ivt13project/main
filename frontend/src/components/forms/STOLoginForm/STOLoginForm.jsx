import { useState } from 'react'
import { useNavigate } from 'react-router'
import PasswordInput from '../PasswordInput/PasswordInput'
import STOPhoneInput from '../STOPhoneInput/STOPhoneInput'
import SubmitButton from '../SubmitButton/SubmitButton'
import './STOLoginForm.scss'
import { loginOrganization } from '/src/api/api.js'

const STOLoginForm = () => {
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)
	const [globalError, setGlobalError] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		setGlobalError('')
		if (!phone || !password) {
			setGlobalError('* Все поля должны быть заполнены')
			return
		}

		try {
			const response = await loginOrganization({
				responsible_person_phone_number: phone,
				password,
			})
			localStorage.setItem('orgId', response.id)
			navigate('/')
		} catch {
			setGlobalError('* Неверный логин или пароль')
		}
	}

	return (
		<div>
			<form className='login__form form' onSubmit={handleSubmit}>
				<h1 className='form__title'>Войти в партнерский аккаунт</h1>
				<STOPhoneInput
					value={phone}
					onChange={e => setPhone(e.target.value)}
					error={!!globalError}
				/>
				<PasswordInput
					placeholder={'Пароль'}
					value={password}
					onChange={e => setPassword(e.target.value)}
					error={!!globalError}
				/>
				{globalError && <p className='error-message'>{globalError}</p>}
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
					Нет партнерского аккаунта?{' '}
					<a href='/register/STO' id='switchToRegister'>
						Зарегистрироваться
					</a>
				</p>
			</form>
		</div>
	)
}

export default STOLoginForm
