/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './ServiceSelection.scss'
import { fetchServiceDetails, fetchServiceTypes } from '/src/api/api'

const ServiceSelection = ({ onToggle, activeCategory, selectedServices }) => {
	const [serviceTypes, setServiceTypes] = useState([])
	const [serviceDetails, setServiceDetails] = useState([])
	const [selectedGroup, setSelectedGroup] = useState(null)

	const iconMapping = {
		'Диагностика автомобиля':
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/75/f8/75f8a15736aec7c16ba6790b2c9ebfba.svg',
		'Тормозная система':
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/8e/c6/8ec609a9e2aa302a80176df6b5fcb188.svg',
		Трансмиссия:
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/3e/52/3e52af02cf8160ce1d53cfa32c5fe45b.svg',
		'Стекло замена':
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/c8/e6/c8e628e11e2456375f783a4dd1d85e3d.svg',
		Автоэлектрика:
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/29/96/29961d111ede8b082283d42c2679159f.svg',
		Ремонт:
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/c9/b8/c9b85e2c92551e00dcc7cc1dfaccbe3c.svg',
		'Полировка кузова':
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/1a/4c/1a4c2cf96a5be72c1b21fd03869a3246.svg',
		'Сервис салона автомобиля':
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/ea/ac/eaac0eea55857052b47c348cad683637.svg',
		Шиномонтаж:
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/90/c9/90c970893e83e3e8019c55d90c894850.svg',
		'Дополнительное оборудование':
			'https://uremont-dev.s3.eu-central-1.amazonaws.com/upload/39/ea/39eafb1caca0b7e99eb83bce191932fb.svg',
	}

	const categoryMapping = {
		1: 'Ремонтные работы',
		2: 'Ремонтные работы',
		3: 'Ремонтные работы',
		4: 'Ремонтные работы',
		5: 'Ремонтные работы',
		6: 'Кузовные работы',
		7: 'Кузовные работы',
		8: 'Кузовные работы',
		9: 'Другие работы',
		10: 'Другие работы',
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
