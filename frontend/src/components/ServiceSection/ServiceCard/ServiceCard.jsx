/* eslint-disable react/prop-types */
import './ServiceCard.scss'

const ServiceCard = ({ title, description, link }) => {
	return (
		<div className='service-card'>
			<div className='service-card__content'>
				<h2>{title}</h2>
				<p>{description}</p>
				<a href={link.href}>{link.text}</a>
			</div>
		</div>
	)
}

export default ServiceCard
