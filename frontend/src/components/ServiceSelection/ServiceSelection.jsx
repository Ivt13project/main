/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './ServiceSelection.scss'
import { fetchServiceTypes, fetchServiceDetails } from '/src/api/api'

const ServiceSelection = ({ onToggle, activeCategory, selectedServices }) => {
	const [serviceTypes, setServiceTypes] = useState([])
	const [serviceDetails, setServiceDetails] = useState([])
	const [selectedGroup, setSelectedGroup] = useState(null)

	const iconMapping = {
		'Диагностика автомобиля':
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/75/f8/75f8a15736aec7c16ba6790b2c9ebfba.svg',
		'Тормозная система':
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/8e/c6/8ec609a9e2aa302a80176df6b5fcb188.svg',
		'Трансмиссия':
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/3e/52/3e52af02cf8160ce1d53cfa32c5fe45b.svg',
	}

	const categoryMapping = {
		1: 'Ремонтные работы',
		2: 'Кузовные работы',
		3: 'Другие работы',
	}

	useEffect(() => {
		const loadServicesData = async () => {
			try {
				const typesData = await fetchServiceTypes()
				const detailsData = await fetchServiceDetails()
				setServiceTypes(typesData)
				setServiceDetails(detailsData)
			} catch (error) {
				console.error('Ошибка загрузки данных:', error)
			}
		}

		loadServicesData()
	}, [])

	useEffect(() => {
		setSelectedGroup(null)
	}, [activeCategory])

	const filteredGroups = serviceTypes.filter(
		group => categoryMapping[group.id] === activeCategory
	)

	return (
		<div className='service-selection__groups'>
			<h2 className='service-selection__groups-title service-selection__title'>
				Выберите группу
			</h2>
			<ul className='service-selection__group-list'>
				{filteredGroups.map(group => {
					const isActive = selectedServices[group.type_name]?.length > 0
					const isCurrentGroup = selectedGroup?.id === group.id
					const iconPath = iconMapping[group.type_name] || '' 

					return (
						<li
							key={group.id}
							className={`service-selection__group-item ${
								isActive ? 'active-group' : ''
							} ${isCurrentGroup ? 'current-group' : ''}`}
							onClick={() => setSelectedGroup(group)}
						>
							{iconPath && <img src={iconPath} alt={group.type_name} />}
							<p>{group.type_name}</p>
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
						{serviceDetails
							.filter(service => service.type_of_service === selectedGroup.id)
							.map(service => (
								<li
									key={service.id}
									className={`service-selection__service-item ${
										selectedServices[selectedGroup.type_name]?.includes(
											service.service_detail_name
										)
											? 'active-service'
											: ''
									}`}
									onClick={() =>
										onToggle(
											selectedGroup.type_name,
											service.service_detail_name
										)
									}
								>
									{service.service_detail_name}
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default ServiceSelection
