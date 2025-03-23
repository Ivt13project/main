/* eslint-disable react/prop-types */
import { useState } from 'react'
import Cross from '../../Cross/Cross'
import './STOServiceForm.scss'

function STOServiceForm({ onClose, onSubmit, initialData }) {
	const [category, setCategory] = useState(initialData?.category || '')
	const [title, setTitle] = useState(initialData?.title || '')
	const [price, setPrice] = useState(initialData?.price || '')
	const [description, setDescription] = useState(initialData?.description || '')
	const [errors, setErrors] = useState({
		category: '',
		title: '',
		price: '',
		description: '',
	})

	const russianLettersOnly = /^[а-яА-ЯёЁ\s]+$/
	const numbersOnly = /^\d+$/

	const validate = () => {
		const newErrors = {}

		if (!category) {
			newErrors.category = '* это обязательное поле'
		} else if (!russianLettersOnly.test(category)) {
			newErrors.category = '* Только русские буквы'
		}

		if (!title) {
			newErrors.title = '* это обязательное поле'
		} else if (!russianLettersOnly.test(title)) {
			newErrors.title = '* Только русские буквы'
		}

		if (!price) {
			newErrors.price = '* это обязательное поле'
		} else if (!numbersOnly.test(price)) {
			newErrors.price = '* Введите число'
		}

		if (!description) {
			newErrors.description = '* это обязательное поле'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (validate()) {
			onSubmit({
				id: initialData?.id || Date.now(),
				category,
				title,
				price,
				description,
			})
		}
	}

	const handleCategoryChange = e => {
		const value = e.target.value
		if (russianLettersOnly.test(value) || value === '') {
			setCategory(value)
		} else {
			setErrors(prev => ({ ...prev, category: '* Только русские буквы' }))
		}
	}

	const handleTitleChange = e => {
		const value = e.target.value
		if (russianLettersOnly.test(value) || value === '') {
			setTitle(value)
		} else {
			setErrors(prev => ({ ...prev, title: '* Только русские буквы' }))
		}
	}

	const handlePriceChange = e => {
		const value = e.target.value
		if (numbersOnly.test(value) || value === '') {
			setPrice(value)
		} else {
			setErrors(prev => ({ ...prev, price: '* Введите число' }))
		}
	}

	return (
		<div className='popup__overlay'>
			<div className='popup__content sto-service-popup__content'>
				<div className='popup__top'>
					<h2 className='popup__title'>
						{initialData ? 'Редактировать услугу' : 'Добавить услугу'}
					</h2>
					<div onClick={onClose} className='popup__close'>
						<Cross />
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<input
						className='form__input'
						type='text'
						placeholder='Категория'
						value={category}
						onChange={handleCategoryChange}
					/>
					{errors.category && (
						<div className='error-message'>{errors.category}</div>
					)}

					<input
						className='form__input'
						type='text'
						placeholder='Название услуги'
						value={title}
						onChange={handleTitleChange}
					/>
					{errors.title && <div className='error-message'>{errors.title}</div>}

					<input
						className='form__input'
						type='text'
						placeholder='Цена'
						value={price}
						onChange={handlePriceChange}
					/>
					{errors.price && <div className='error-message'>{errors.price}</div>}

					<textarea
						className='form__input'
						placeholder='Описание'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
					{errors.description && (
						<div className='error-message'>{errors.description}</div>
					)}

					<div>
						<button
							className='sto-service-form__button form__button'
							type='submit'
						>
							{initialData ? 'Сохранить изменения' : 'Добавить услугу'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default STOServiceForm
