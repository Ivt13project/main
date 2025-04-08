/* eslint-disable react/prop-types */
import './NameInput.scss'

const NameInput = ({ placeholder, value, onChange, error }) => {
	const handleChange = e => {
		const { value } = e.target
		const regex = /^[а-яА-ЯёЁ\s]*$/

		if (regex.test(value) || value === '') {
			onChange(e)
		}
	}

	return (
		<div>
			<input
				className={`form__input name__input ${error ? 'input-error' : ''}`}
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
			/>
			{error && <p className='error-message'>{error}</p>}
		</div>
	)
}

export default NameInput
