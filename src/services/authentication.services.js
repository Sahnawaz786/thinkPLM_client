import axios from 'axios';
import { isAuthenticated } from '../utils/helper';
// const dotenv = require('dotenv');

// dotenv.config({ path: '../.env' });

// const baseURL = process.env.baseURL;

const baseURL = 'http://localhost:8181';

class authenticationServices {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getUser() {
        console.log({auth:   isAuthenticated()})
        try {
            const response = await axios.get(`${baseURL}/getAllRegisterUserWithThink`, {
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


    async deleteUser(id) {
        try {
            const response = await axios.delete(`${baseURL}/DeleteByIdRegisterUserWithThink/${id}`, {
                headers: { Authorization: `Bearer ${isAuthenticated()}`},
            });
            if (response.status!==200) {
                throw new Error(`Failed to fetch parts: ${response.statusText}`);
            }
            return await response;
        } catch (error) {
            console.error('Error fetching parts:', error);
            return Promise.reject(error);
        }
    }

}

export default authenticationServices;
