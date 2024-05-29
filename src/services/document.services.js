import axios from 'axios';
import { isAuthenticated } from '../utils/helper';
// const dotenv = require('dotenv');

// dotenv.config({ path: '../.env' });

// const baseURL = process.env.baseURL;

const baseURL = 'http://localhost:8181';

class DocumentServices {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAllDocuments() {
        try {
            const response = await axios.get(`${baseURL}/SupplierMasterContractObject`, {
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

    async editPartById(id,partData) {
        try {
            const response = await axios.put(`${this.baseURL}/SupplierMasterObject/${id}`, {
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

    async getDocumentById(id) {
        try {
            const response = await axios.get(`${baseURL}/getSupplierMasterContractById/${id}`, {
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

    async getDocumentHistoryById(id) {
        try {
            const response = await axios.get(`${baseURL}/SupplierMasterContractObject/${id}`, {
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
            const response = await axios.get(`${baseURL}/downloadFile/${id}`, {
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

            const response = await axios.get(`${baseURL}/SupplierMasterObject/${id}`, {
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

    async deleteDocument(id) {
        try {
            const response = await axios.delete(`${baseURL}/SupplierMasterContractObject/${id}`, {
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

export default DocumentServices;
