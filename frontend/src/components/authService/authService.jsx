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

const loginCustomer = (phoneNumber, password) => {
    return axios.post(API_URL + 'customers/login/', {
        customer_phone_number: phoneNumber,
        password,
    }).then(response => {
        if (response.data.access) {
            localStorage.setItem('customer', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logoutCustomer = () => {
    localStorage.removeItem('customer');
};

export default {
    registerCustomer,
    loginCustomer,
    logoutCustomer,
};
