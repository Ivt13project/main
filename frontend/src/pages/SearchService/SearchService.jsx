import { useState, useEffect } from 'react'
import CarServiceSelection from '../../components/CarServiceSelection/CarServiceSelection'
import SelectedServices from '../../components/SelectedServices/SelectedServices'
import ServiceSelection from '../../components/ServiceSelection/ServiceSelection'
import SummaryService from '../../components/SummaryService/SummaryService'
import './SearchService.scss'
import { fetchServiceDetails } from '/src/api/api'
import Header from '../../components/Header/Header'

const SearchService = () => {
	const [selectedServices, setSelectedServices] = useState({})
	const [serviceDetails, setServiceDetails] = useState([])
	const [selectedOrganizationId, setSelectedOrganizationId] = useState(null)
	const categories = ['Ремонтные работы', 'Кузовные работы', 'Другие работы']
	const [activeCategory, setActiveCategory] = useState(categories[0])

	useEffect(() => {
		const loadServiceDetails = async () => {
			try {
				const detailsData = await fetchServiceDetails()
				setServiceDetails(detailsData)
			} catch (error) {
				console.error('Ошибка загрузки деталей услуг:', error)
			}
		}

		loadServiceDetails()
	}, [])

	const handleToggleService = (group, service) => {
		setSelectedServices(prev => {
			const groupServices = prev[group] || []
			const updatedGroupServices = groupServices.includes(service)
				? groupServices.filter(s => s !== service)
				: [...groupServices, service]

			if (updatedGroupServices.length === 0) {
				const {  ...rest } = prev
				return rest
			}

			return { ...prev, [group]: updatedGroupServices }
		})
	}

	const handleRemoveService = (group, service) => {
		setSelectedServices(prev => {
			const updatedGroupServices = prev[group].filter(s => s !== service)

			if (updatedGroupServices.length === 0) {
				const {  ...rest } = prev
				return rest
			}

			return { ...prev, [group]: updatedGroupServices }
		})
	}

	const handleRemoveGroup = group => {
		setSelectedServices(prev => {
			const newServices = { ...prev }
			delete newServices[group]
			return newServices
		})
	}

	return (
		<>
		<Header></Header>
			<main className='service-selection'>
				<div className='service-selection__container container'>
					<div className='service-selection__grid'>
						<div className='service-selection__left'>
							<SelectedServices
								services={selectedServices}
								onRemoveService={handleRemoveService}
								onRemoveGroup={handleRemoveGroup}
								serviceDetails={serviceDetails}
							/>
							<CarServiceSelection
								setSelectedOrganizationId={setSelectedOrganizationId}
							/>
							<SummaryService
								total={Object.values(selectedServices).flat().length}
								selectedServices={selectedServices}
								selectedOrganizationId={selectedOrganizationId}
								serviceDetails={serviceDetails}
							/>
						</div>
						<div className='service-selection__right'>
							<div className='service-selection__tabs'>
								{categories.map(category => (
									<button
										key={category}
										onClick={() => setActiveCategory(category)}
										className={
											activeCategory === category
												? 'service-selection__tab active'
												: 'service-selection__tab'
										}
									>
										{category}
									</button>
								))}
							</div>
							<ServiceSelection
								onToggle={handleToggleService}
								activeCategory={activeCategory}
								selectedServices={selectedServices}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default SearchService
