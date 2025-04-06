/* eslint-disable react/prop-types */
import Cross from '../Cross/Cross'
import './SelectedServices.scss'

const SelectedServices = ({
	services,
	onRemoveService,
	onRemoveGroup,
	serviceDetails,
}) => {
	const calculateTotal = () => {
		return Object.entries(services).reduce((total, [, groupServices]) => {
			const groupTotal = groupServices.reduce((sum, serviceName) => {
				const serviceDetail = serviceDetails.find(
					s => s.service_detail_name === serviceName
				)
				return sum + (serviceDetail ? serviceDetail.service_detail_cost : 0)
			}, 0)
			return total + groupTotal
		}, 0)
	}

	return (
		<div className='service-selection__selected-service selected-service'>
			<h2 className='selected-service__title'>Выбранные услуги</h2>
			{Object.entries(services).length === 0 ? (
				<p className='selected-service__empty'>Нет выбранных услуг</p>
			) : (
				Object.entries(services).map(([group, groupServices]) => (
					<div key={group} className='selected-service__group'>
						<h3 className='selected-service__group-title'>
							{group}
							<div
								className='selected-service__close'
								onClick={() => onRemoveGroup(group)}
							>
								<Cross />
							</div>
						</h3>
						<ul className='selected-service__list'>
							{groupServices.map((serviceName, index) => {
								const serviceDetail = serviceDetails.find(
									s => s.service_detail_name === serviceName
								)
								const price = serviceDetail
									? serviceDetail.service_detail_cost
									: 0

								return (
									<li className='selected-service__item' key={index}>
										{serviceName} - {price} руб.
										<div
											className='selected-service__close'
											onClick={() => onRemoveService(group, serviceName)}
										>
											<Cross />
										</div>
									</li>
								)
							})}
						</ul>
					</div>
				))
			)}
			<div className='selected-service__total'>
				<h3>Итого: {calculateTotal()} руб.</h3>
			</div>
		</div>
	)
}

export default SelectedServices
