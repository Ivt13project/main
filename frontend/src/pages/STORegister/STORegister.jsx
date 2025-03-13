import Header from '../../components/Header/Header'
import './STORegister.scss'
import STORegistrationForm from '../../components/forms/STORegistrationForm/STORegistrationForm'

const STORegister = () => {
	return (
		<>
			<Header />
			<div className="sto-register__container container">
				<STORegistrationForm/>
			</div>
		</>
	)
}

export default STORegister
