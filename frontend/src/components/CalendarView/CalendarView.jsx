import moment from 'moment'
import 'moment/locale/ru'
import { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarView.scss'
import { fetchSTORequests } from '/src/api/api'

moment.locale('ru')
const localizer = momentLocalizer(moment)

const CalendarView = () => {
	const [events, setEvents] = useState([])

	const statusTranslation = {
		PENDING: 'Ожидает подтверждения',
		IN_PROGRESS: 'В работе',
		COMPLETED: 'Завершено',
		CANCELLED: 'Отменено',
	}

	useEffect(() => {
		const fetchAndSetEvents = async () => {
			try {
				const orgId = localStorage.getItem('orgId')
				const data = await fetchSTORequests(orgId)

				const eventsData = data.map(event => ({
					title: `${event.service_detail_name} - ${
						statusTranslation[event.status]
					}`,
					start: new Date(event.date_service),
					end: new Date(event.date_service),
					location: `${event.city_name}, ${event.street_name}`,
					price: event.service_cost,
				}))

				setEvents(eventsData)
			} catch (error) {
				console.error('Ошибка при обработке данных:', error)
			}
		}

		fetchAndSetEvents()
	}, [])

	return (
		<div style={{ height: '650px' }}>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 650 }}
				popup
				defaultView='month'
				onSelectEvent={event => alert(event.title)}
			/>
		</div>
	)
}

export default CalendarView
