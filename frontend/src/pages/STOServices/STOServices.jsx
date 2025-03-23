import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import STOServiceList from '../../components/STOServiceList/STOServiceList'
import servicesData from '../../data/STOservicesData'

function STOServices() {
	useEffect(() => {
		document.title = 'Услуги организации | 4inilka'
	}, [])

	const [services, setServices] = useState(servicesData)

	const addService = newService => {
		setServices([...services, { ...newService, id: Date.now() }])
	}

	const removeService = id => {
		setServices(services.filter(service => service.id !== id))
	}

	const updateService = updatedService => {
		setServices(
			services.map(service =>
				service.id === updatedService.id ? updatedService : service
			)
		)
	}

	return (
		<>
			<Header />
			<div className='sto-services__container container'>
				<h2 className='sto-services__title title'>Услуги организации</h2>
				<STOServiceList
					services={services}
					onRemove={removeService}
					onUpdate={updateService}
					onAdd={addService}
				/>
			</div>
		</>
	)
}

export default STOServices
