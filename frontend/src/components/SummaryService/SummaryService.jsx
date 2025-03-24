/* eslint-disable react/prop-types */
import './SummaryService.scss'

const SummaryService = ({ total }) => {
	return (
			<div className='service-selection__summary'>
				<span>
					Итого: <strong>{total} услуги</strong>
				</span>
				<button>
					Продолжить
				</button>
			</div>
	)
}

export default SummaryService
