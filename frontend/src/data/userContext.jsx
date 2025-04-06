/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const defaultUserData = {
		name: '',
		birthdate: '',
		phone: '',
		email: '',
		city: '',
	}

	const [userData, setUserData] = useState(() => {
		const savedData =
			JSON.parse(localStorage.getItem('userData')) || defaultUserData
		return savedData
	})

	useEffect(() => {
		localStorage.setItem('userData', JSON.stringify(userData))
	}, [userData])

	const updateUserData = (key, value) => {
		setUserData(prevData => ({ ...prevData, [key]: value }))
	}

	return (
		<UserContext.Provider value={{ userData, updateUserData }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => useContext(UserContext)
