import { useEffect } from 'react'
import STORegistrationForm from '../../components/forms/STORegistrationForm/STORegistrationForm'
import Header from '../../components/Header/Header'
import './STORegister.scss'

const STORegister = () => {
	useEffect(() => {
		document.title = 'Регистрация партнерского аккаунта | ITishka'
	}, [])
	return (
		<>
			<Header />
			<div className='sto-register__container container'>
				<STORegistrationForm />
			</div>
		</>
	)
}

export default STORegister
