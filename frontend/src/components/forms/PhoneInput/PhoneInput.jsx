/* eslint-disable react/prop-types */
import { IMaskInput } from 'react-imask'
import './PhoneInput.scss'

const PhoneInput = ({ value, onChange, error }) => {
	const handlePhoneChange = value => {
		onChange({
			target: {
				name: 'phone',
				value,
			},
		})
	}

	return (
		<div>
			<IMaskInput
				mask='+{7}(000)000-00-00'
				className={`form__input phone__input ${error ? 'input-error' : ''}`}
				value={value}
				placeholder='Номер телефона'
				onAccept={handlePhoneChange} 
			/>
			{error && <p className='error-message'>{error}</p>}
		</div>
	)
}

export default PhoneInput
