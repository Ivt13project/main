/* eslint-disable react/prop-types */
// components/StepSection/StepSection.jsx
import './StepSection.scss'

const StepSection = ({ steps, title}) => {
	return (
		<section className='step-section'>
			<h2>{title}</h2>
			<div className='step-section__steps'>
				{steps.map((step, index) => (
					<div key={index} className='step'>
						<div className='step__number'>{step.number}</div>
						<p className='step__description'>{step.description}</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default StepSection
