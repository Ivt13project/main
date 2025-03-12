/* eslint-disable react/prop-types */
import Cross from '../Cross/Cross'
import './SelectedServices.scss'

const SelectedServices = ({ services, onRemoveService, onRemoveGroup }) => (
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
						{groupServices.map((service, index) => (
							<li className='selected-service__item' key={index}>
								{service}
								<div
									className='selected-service__close'
									onClick={() => onRemoveService(group, service)}
								>
									<Cross />
								</div>
							</li>
						))}
					</ul>
				</div>
			))
		)}
	</div>
)

export default SelectedServices
