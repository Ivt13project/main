import { useEffect } from 'react'
import LoginForm from '../../components/forms/LoginForm/LoginForm'
import Header from '../../components/Header/Header'
import './Login.scss'

const Login = () => {
	useEffect(() => {
		document.title = 'Вход в аккаунт | ITishka'
	}, [])
	return (
		<>
			<Header />
			<div className='login__container container'>
				<LoginForm />
			</div>
		</>
	)
}

export default Login
