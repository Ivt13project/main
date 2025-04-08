import ServiceCard from './ServiceCard/ServiceCard'
import './ServiceSection.scss';

const services = [
	{
		title: 'Автосервисы',
		description: 'Отобрали надежные автосервисы',
		link: { href: '/search/service', text: 'Перейти' },
	},
	{
		title: 'Стоимость работ',
		description: 'Покажем предварительную стоимость',
		link: { href: '/search/service', text: 'Выбрать услуги' },
	},
	{
		title: 'Быстрый ответ',
		description: 'Автосервис свяжется с вами и уточнит детали',
		link: { href: '/search/service', text: 'Узнать больше' },
	},
	{
		title: 'Cервисная книжка',
		description: 'Сохраним историю обслуживания автомобиля',
		link: { href: '/applications', text: 'Проверить' },
	},
]

const ServiceSection = () => {
  return (
		<section className='service-section'>
			<div className='service-section__cards'>
				{services.map((service, index) => (
					<ServiceCard key={index} {...service} />
				))}
			</div>
		</section>
	)
};

export default ServiceSection;
