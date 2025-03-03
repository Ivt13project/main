import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Partnership from './pages/Partnership/Partnership'
import Register from './pages/Register/Register'
import Service from './pages/Service/Service'
import './styles/style.scss'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/partnership' element={<Partnership />} />
				<Route path='/service' element={<Service />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</Router>
	)
}
export default App
