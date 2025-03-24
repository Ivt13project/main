import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const registerCustomer = (surname, name, patronymic, phoneNumber, password) => {
    return axios.post(API_URL + 'customers/register/', {
        customer_surname: surname,
        customer_name: name,
        customer_patronymic: patronymic,
        customer_phone_number: phoneNumber,
        password,
    });
};

const loginCustomer = async (phoneNumber, password) => {
    try {
        const response = await axios.post(API_URL + 'customers/login/', {
            customer_phone_number: phoneNumber,
            password: password,
        });
        if (response.data.access) {
            localStorage.setItem('customer', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Ошибка входа:', error);
        throw error;
    }
};

const logoutCustomer = () => {
    localStorage.removeItem('customer');
};

export default {
    registerCustomer,
    loginCustomer,
    logoutCustomer,
};
