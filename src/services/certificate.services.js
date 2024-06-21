import { isAuthenticated } from '../utils/helper';
import api from './api';
// const dotenv = require('dotenv');

// dotenv.config({ path: '../.env' });

// const baseURL = process.env.baseURL;

const baseURL = 'http://localhost:8181';

class CertificateServices {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAllCertificateDocuments() {
        try {
            const response = await api.get(`${baseURL}/Certification_of_InsuranceMasterObject`, {
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

    async editCertificateDocumentById(id,partData) {
        try {
            const response = await api.put(`${this.baseURL}/InvoiceMasterObject/${id}`, {
                headers: { Authorization: `Bearer ${isAuthenticated()}`},
            },partData);

            if (response.status!=200) {
                throw new Error(`Failed to add part: ${response.statusText}`);
            }
            return await response;
        } catch (error) {
            console.error('Error adding part:', error);
            return null;
        }
    }

    async getCertificateDocumentById(id) {
        try {
            const response = await api.get(`${baseURL}/Certification_of_InsuranceMasterObject1/${id}`, {
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

    async getCertificateDocumentHistoryById(id) {
        try {
            const response = await api.get(`${baseURL}/Certification_of_InsuranceMasterObject/${id}`, {
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


    async deleteCertificateDocumentById(id) {
        try {
            const response = await api.delete(`${baseURL}/Certification_of_InsuranceMasterObject/${id}`, {
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

export default CertificateServices;
