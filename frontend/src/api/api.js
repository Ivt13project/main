import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/'

export const fetchOrganizations = async () => {
	try {
		const response = await axios.get(`${API_URL}organizations/`)
		return response.data
	} catch (error) {
		console.error('There was an error fetching the organizations!', error)
		throw error
	}
}
