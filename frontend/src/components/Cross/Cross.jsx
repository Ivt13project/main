/* eslint-disable react/prop-types */
import './Cross.scss'

const Cross = ({onClose}) => {
	return (
		<>
			<svg
				onClick={onClose}
				fill='#2B2B2B'
				width='20px'
				height='20px'
				viewBox='0 0 20 20'
			>
				<path d='M17 4.225L15.775 3L10 8.775L4.225 3L3 4.225L8.775 10L3 15.775L4.225 17L10 11.225L15.775 17L17 15.775L11.225 10L17 4.225Z'></path>
			</svg>
		</>
	)
}

export default Cross
