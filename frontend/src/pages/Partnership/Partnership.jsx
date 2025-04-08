import { useEffect } from 'react'
import Header from '../../components/Header/Header'
import './Partnership.scss'

const Partnership = () => {
	useEffect(() => {
		document.title = 'Подключение автосервисов | 4inilka'
	}, [])

	return (
		<>
			<Header />
			<div className='partnership'>
				<div className='partnership__container container'>
					<div className='partnership__hero'>
						<h2 className='partnership__title'>
							Регистрируйтесь на платформе для автосервисов 4inilka. и
							увеличивайте количество новых клиентов
						</h2>
						<p className='partnership__sub-title'>
							Более 1200 заявок в день, вывод средств за 3 дня, честный рейтинг
							и другие преимущества
						</p>
						<a href='/register/STO' className='partnership__btn'>
							Стать партнером
						</a>
					</div>
					<div className='partnership__img'>
						<img
							src='/src/assets/img/auto-detailing-abstract-concept.png'
							alt=''
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Partnership
