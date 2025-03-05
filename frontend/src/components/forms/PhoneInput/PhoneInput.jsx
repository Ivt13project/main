/* eslint-disable react/prop-types */
import { IMaskInput } from 'react-imask'
import './PhoneInput.scss'

const PhoneInput = ({ value, onChange, error }) => {
	return (
		<div>
			<IMaskInput
				mask='+{7}(000)000-00-00'
				className={`form__input phone__input ${error ? 'input-error' : ''}`}
				value={value}
				placeholder='Номер телефона'
				onChange={onChange}
			/>
			{error && <p className='error-message'>{error}</p>}
		</div>
	)
}

export default PhoneInput
