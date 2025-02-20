import { useEffect } from 'react'
import Header from '../../components/Header/Header'
import './Login.scss'

const Login = () => {
	useEffect(() => {
		document.title = 'Вход в систему | ITishka'
	}, [])
	return (
		<div>
			<Header />
			<h1>Страница входа и регистрации</h1>
		</div>
	)
}

export default Login
