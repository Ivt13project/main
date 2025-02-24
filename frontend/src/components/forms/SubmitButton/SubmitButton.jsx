/* eslint-disable react/prop-types */
import './SubmitButton.scss'

const SubmitButton = ({text}) => {
	return (
		<button className='form__button' type='submit'>
			{text}
		</button>
	)
}

export default SubmitButton
