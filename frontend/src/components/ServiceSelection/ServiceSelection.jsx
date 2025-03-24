	/* eslint-disable react/prop-types */
	import { useEffect, useState } from 'react'
	import './ServiceSelection.scss'
	import servicesData from '../../data/servicesData'

	const ServiceSelection = ({ onToggle, activeCategory, selectedServices }) => {
		const [selectedGroup, setSelectedGroup] = useState(null)
		const groups = servicesData[activeCategory] || []

		useEffect(() => {
			setSelectedGroup(null)
		}, [activeCategory])

		return (
			<div className='service-selection__groups'>
				<h2 className='service-selection__groups-title service-selection__title'>
					Выберите группу
				</h2>
				<ul className='service-selection__group-list'>
					{groups.map(group => {
						const isActive = selectedServices[group.name]?.length > 0
						const isCurrentGroup = selectedGroup?.name === group.name

						return (
							<li
								key={group.name}
								className={`service-selection__group-item ${
									isActive ? 'active-group' : ''
								} ${isCurrentGroup ? 'current-group' : ''}`}
								onClick={() => setSelectedGroup(group)}
							>
								<img
									src={group.img}
									alt=''
								/>
								<p>{group.name}</p>
							</li>
						)
					})}
				</ul>

				{selectedGroup && (
					<div className='service-selection__services'>
						<h2 className='service-selection__services-title service-selection__title'>
							Выберите услугу
						</h2>
						<ul className='service-selection__service-list'>
							{selectedGroup.services.map(service => (
								<li
									key={service}
									className={`service-selection__service-item ${
										selectedServices[selectedGroup.name]?.includes(service)
											? 'active-service'
											: ''
									}`}
									onClick={() => onToggle(selectedGroup.name, service)}
								>
									{service}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		)
	}

	export default ServiceSelection
