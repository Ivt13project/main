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

export const registerCustomer = async ({ name, password, phone }) => {
	try {
		const response = await axios.post(`${API_URL}customers/register/`, {
			customer_name: name,
			password,
			customer_phone_number: phone,
		})
		return response.data
	} catch (error) {
		console.error('There was an error registering the customer!', error)
		throw error
	}
}

export const loginCustomer = async ({ phone, password }) => {
	try {
		const response = await axios.post(`${API_URL}customers/login/`, {
			customer_phone_number: phone,
			password,
		})
		return response.data
	} catch (error) {
		console.error('There was an error logging in the customer!', error)
		throw error
	}
}

export const registerOrganization = async organizationData => {
	try {
		const response = await axios.post(
			`${API_URL}organizations/register/`,
			organizationData
		)
		return response.data
	} catch (error) {
		console.error('Ошибка при регистрации организации!', error)
		throw error
	}
}

export const loginOrganization = async data => {
	try {
		const { responsible_person_phone_number, password } = data
		const response = await axios.post(`${API_URL}organizations/login/`, {
			responsible_person_phone_number,
			password,
		})
		return response.data
	} catch (error) {
		if (error.response) {
			console.error('Ошибка на сервере:', error.response.data)
		} else if (error.request) {
			console.error('Не получен ответ от сервера:', error.request)
		} else {
			console.error('Ошибка при настройке запроса:', error.message)
		}
		throw error
	}
}

export const fetchCustomerData = async userId => {
	try {
		const response = await axios.get(`${API_URL}customers/${userId}/`)
		return response.data
	} catch (error) {
		console.error('Ошибка при получении данных о пользователе:', error)
		throw error
	}
}

export const updateCustomerData = async (userId, data) => {
	try {
		const response = await axios.patch(`${API_URL}customers/${userId}/`, data)
		return response.data
	} catch (error) {
		console.error('Ошибка при обновлении данных о пользователе:', error)
		throw error
	}
}

export const fetchCities = async () => {
	try {
		const response = await axios.get(`${API_URL}cities/`)
		return response.data
	} catch (error) {
		console.error('Ошибка при получении списка городов:', error)
		throw error
	}
}

export const fetchRequests = async () => {
	try {
		const userId = localStorage.getItem('userId')
		const response = await axios.get(`${API_URL}service/requests`, {
			params: { customer_id: userId },
		})
		return response.data
	} catch (error) {
		console.error('Ошибка при получении заявок:', error)
		throw error
	}
}

export const cancelRequest = async requestId => {
	try {
		const response = await axios.post(
			`${API_URL}service/requests/${requestId}/cancel`
		)
		return response.data
	} catch (error) {
		console.error('Ошибка при отмене заявки:', error)
		throw error
	}
}

export const fetchServiceTypes = async () => {
	try {
		const response = await axios.get(`${API_URL}service/types`)
		return response.data
	} catch (error) {
		console.error('Ошибка при получении типов услуг:', error)
		throw error
	}
}

export const fetchServiceDetails = async () => {
	try {
		const response = await axios.get(`${API_URL}service/details`)
		return response.data
	} catch (error) {
		console.error('Ошибка при получении деталей услуг:', error)
		throw error
	}
}

export const fetchOrganizationById = async orgId => {
	try {
		const response = await axios.get(`${API_URL}organizations/${orgId}/`)
		return response.data
	} catch (error) {
		console.error('Ошибка при получении данных о организации:', error)
		throw error
	}
}

export const createServiceRequest = async data => {
	try {
		const response = await axios.post(`${API_URL}service/create`, data)
		return response.data
	} catch (error) {
		console.error('Ошибка при создании заявки:', error)
		throw error
	}
}

export const fetchSTORequests = async () => {
	const orgId = localStorage.getItem('orgId')
	const response = await axios.get(`${API_URL}service/requests?organization_id=${orgId}`)
	return response.data
}

export const updateSTORequestStatus = async (id, status) => {
	try {
		const response = await axios.patch(
			`${API_URL}service/requests/${id}/status`,
			{
				status,
			}
		)
		return response.data
	} catch (error) {
		console.error('Ошибка при обновлении статуса заявки:', error)
		throw error
	}
}

