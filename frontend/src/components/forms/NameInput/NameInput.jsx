/* eslint-disable react/prop-types */
import './NameInput.scss'

const NameInput = ({ placeholder, value, onChange, error }) => {
	return (
		<div>
			<input
				className={`form__input name__input ${error ? 'input-error' : ''}`}
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{error && <p className='error-message'>{error}</p>}
		</div>
	)
}

export default NameInput
