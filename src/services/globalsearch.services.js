import { isAuthenticated } from '../utils/helper';
import api from './api';
// const dotenv = require('dotenv');

// dotenv.config({ path: '../.env' });

// const baseURL = process.env.baseURL;

const baseURL = 'http://localhost:8181';

class globalSearchServices {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }


    async globalSearchByNameAndNumber(data) {
        try {
            const response = await api.get(`${baseURL}/search/${data}`, {
                headers: { Authorization: `Bearer ${isAuthenticated()}`},
            });
            if (response.status!==200) {
                throw new Error(`Failed to fetch parts: ${response.statusText}`);
            }
            return await response;
        } catch (error) {
            console.error('Error fetching parts:', error);
            return null;
        }
    }

}

export default globalSearchServices;
