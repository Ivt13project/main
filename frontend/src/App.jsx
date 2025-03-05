import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Partnership from './pages/Partnership/Partnership';
import Register from './pages/Register/Register';
import Service from './pages/Service/Service';
import './styles/style.scss';
import axios from 'axios';

function App() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Замените URL на адрес вашего Django сервера
    axios.get('http://localhost:8000/api/organizations/')
      .then(response => {
        setOrganizations(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home organizations={organizations} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/partnership' element={<Partnership />} />
        <Route path='/service' element={<Service />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
