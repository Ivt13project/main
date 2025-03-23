import CalendarView from '../../components/CalendarView/CalendarView.JSX'
import Header from '../../components/Header/Header'
import './STOCalendar.scss'
import { useEffect } from 'react'

const STOCalendar = () => {
	useEffect(() => {
		document.title = 'Календарь занятости | ITishka'
	}, [])
	return (
		<>
			<Header />
			<CalendarView />
		</>
	)
}

export default STOCalendar
