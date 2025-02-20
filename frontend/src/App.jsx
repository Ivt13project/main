import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Partnership from './pages/Partnership/Partnership'
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
			</Routes>
		</Router>
	)
}
export default App
