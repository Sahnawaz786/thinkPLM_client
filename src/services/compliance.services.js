import { isAuthenticated } from '../utils/helper';
import api from './api';
// const dotenv = require('dotenv');

// dotenv.config({ path: '../.env' });

// const baseURL = process.env.baseURL;

const baseURL = 'http://localhost:8181';
class ComplianceServices {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAllComplianceDocuments() {
        try {
            const response = await api.get(`${baseURL}/ComplainceCertificateMasterObject`, {
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

    async editComplianceDocumentById(id,partData) {
        try {
            const response = await api.put(`${this.baseURL}/SupplierMasterObject/${id}`, {
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

    async getComplianceDocumentById(id) {
        try {
            const response = await api.get(`${baseURL}/ComplainceCertificateMasterObject1/${id}`, {
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

    async getComplianceDocumentHistoryById(id) {
        try {
            const response = await api.get(`${baseURL}/ComplainceCertificateMasterObject/${id}`, {
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


    async getFileDownload(id) {
        try {
            const response = await api.get(`${baseURL}/downloadFile/${id}`, {
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

      async getPartHistoryById(id) {
        try {
            console.log({testID:id});

            const response = await api.get(`${baseURL}/SupplierMasterObject/${id}`, {
                headers: { Authorization: `Bearer ${isAuthenticated()}`},
            });
            console.log({testResponse:response});
            
            if (response.status!==200) {
                throw new Error(`Failed to fetch parts: ${response.statusText}`);
            }
            return await response;
        } catch (error) {
            console.error('Error fetching parts:', error);
            return null;
        }
    }

    async deleteComplianceDocumentById(id) {
        try {
            const response = await api.delete(`${baseURL}/ComplainceCertificateMasterObject/${id}`, {
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

export default ComplianceServices;
