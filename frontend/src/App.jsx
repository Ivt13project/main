import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Applications from './pages/Applications/Applications'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Partnership from './pages/Partnership/Partnership'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import SearchService from './pages/SearchService/SearchService'
import STOLogin from './pages/STOLogin/STOLogin'
import STORegister from './pages/STORegister/STORegister'
import STORequestsServices from './pages/STORequestsServices/STORequestsServices'
import STOCalendar from './pages/STOCalendar/STOCalendar'
import './styles/style.scss'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/partnership' element={<Partnership />} />
				<Route path='/register' element={<Register />} />
				<Route path='/applications' element={<Applications />} />
				<Route path='/search/service' element={<SearchService />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/register/STO' element={<STORegister />} />
				<Route path='/login/STO' element={<STOLogin />} />
				<Route path='/request/services' element={<STORequestsServices />} />
				<Route path='/calendar/STO' element={<STOCalendar />} />
			</Routes>
		</Router>
	)
}
export default App
