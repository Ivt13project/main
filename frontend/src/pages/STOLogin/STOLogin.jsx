import STOLoginForm from '../../components/forms/STOLoginForm/STOLoginForm'
import Header from '../../components/Header/Header'
import './STOLogin.scss'
import { useEffect } from 'react'

const STOLogin = () => {
		useEffect(() => {
			document.title = 'Вход в партнерский аккаунт | ITishka'
		}, [])
	return (
		<>
			<Header />
			<div className='sto-login__container container'>
				<STOLoginForm />
			</div>
		</>
	)
}

export default STOLogin
