import moment from 'moment'
import 'moment/locale/ru'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import STOrequestsData from '../../data/STOrequsetsData'
import './CalendarView.scss'
moment.locale('ru')
const localizer = momentLocalizer(moment)

const events = Object.keys(STOrequestsData).flatMap(status =>
	STOrequestsData[status].map(event => ({
		title: `${event.service} - ${status}`,
		start: new Date(`${event.date}T${event.time}`),
		end: new Date(`${event.date}T${event.time}`),
		location: event.address,
		price: event.price,
	}))
)

const CalendarView = () => (
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

export default CalendarView
