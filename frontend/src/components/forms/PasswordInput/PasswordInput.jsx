/* eslint-disable react/prop-types */
import './PasswordInput.scss'

const PasswordInput = ({ placeholder, value, onChange, error, name }) => {
	return (
		<div>
			<input
				className={`form__input password__input ${error ? 'input-error' : ''}`}
				type='password'
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				name={name}
			/>
			{error && <p className='error-message'>{error}</p>}
		</div>
	)
}

export default PasswordInput
