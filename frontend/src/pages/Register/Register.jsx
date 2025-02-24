import { useEffect } from 'react'
import RegisterForm from '../../components/forms/RegisterForm/RegisterForm'
import Header from '../../components/Header/Header'
import './Register.scss'

const Register = () => {
	useEffect(() => {
		document.title = 'Регистрация аккаунта | 4inilka'
	}, [])
	return (
		<>
			<Header />
			<div className='register__container container'>
				<RegisterForm />
			</div>
		</>
	)
}

export default Register
