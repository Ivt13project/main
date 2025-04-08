import './Reviews.scss'

const Reviews = () => {
	const reviews = [
		{
			serviceType: 'ТО и ремонт',
			stars: '★★★★★',
			author: 'Иван П.',
			car: 'Toyota Camry',
			text: 'Удобный сервис - проходил ТО, остался доволен. Все сделали быстро и качественно, даже кофе предложили, пока ждал. Приятные сотрудники, всегда вежливы и готовы помочь. Буду обращаться еще!',
		},
		{
			serviceType: 'ТО и ремонт',
			stars: '★★★★☆',
			author: 'Мария В.',
			car: 'Volkswagen Polo',
			text: 'Ремонт двери сделали на высшем уровне и в оговоренные сроки. В цвет попали. Машина выглядит как новая. Спасибо мастерам за внимательность и профессионализм. Рекомендую всем!',
		},
		{
			serviceType: 'ТО и ремонт',
			stars: '★★★★★',
			author: 'Ольга М.',
			car: 'Mazda CX-5',
			text: 'Ремонт ходовки сделали за один день, все объяснили по деталям. Мастера профессиональные и доброжелательные. Порадовала прозрачность цен и отсутствие скрытых платежей. Обязательно вернусь!',
		},
		{
			serviceType: 'ТО и ремонт',
			stars: '★★★★☆',
			author: 'Алексей Д.',
			car: 'Renault Duster',
			text: 'В целом хорошие ребята. Всё сделают, всё отремонтируют, лишнего не навяжут, если надо скатаются за запчастью. Если её нет, то придумают что сделать. По ценам ниже чем у конкурентов',
		},
		{
			serviceType: 'Cтрахование',
			stars: '★★★★★',
			author: 'Николай П.',
			car: 'Ford Focus',
			text: 'Удобный сервис для оформления страховки! Все сделал онлайн, потратил 10 минут, все прозрачно и понятно. Большой выбор страховых компаний. Спасибо команде юремонт!',
		},
		{
			serviceType: 'ТО и ремонт',
			stars: '★★★★★',
			author: 'Андрей Л.',
			car: 'Toyota RAV4',
			text: 'Отличное обслуживание. Ремонтировал тормозную систему, все сделали быстро. Приятно, когда работа выполняется с такой ответственностью. Спасибо',
		},
	]
	return (
		<section className='reviews-section'>
			<h1>Отзывы клиентов</h1>
			<div className='reviews__cards'>
				{reviews.map((review, index) => (
					<div className='review__card' key={index}>
						<div className='review-header'>
							<span className='service-type'>{review.serviceType}</span>
							<div className='stars'>{review.stars}</div>
						</div>
						<div className='review-author'>{review.author}</div>
						<div className='review-car'>{review.car}</div>
						<p className='review-text'>{review.text}</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default Reviews
