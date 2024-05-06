import axios from 'axios';
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
            const response = await axios.get(`${baseURL}/SupplierMasterContractObject`);
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
            const response = await axios.put(`${this.baseURL}/SupplierMasterObject/${id}`,partData);

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
            const response = await axios.get(`${baseURL}/getSupplierMasterContractById/${id}`);
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
            const response = await axios.get(`${baseURL}/SupplierMasterContractObject/${id}`);
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
            const response = await axios.get(`${baseURL}/downloadFile/${id}`);
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

            const response = await axios.get(`${baseURL}/SupplierMasterObject/${id}`);
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
            const response = await axios.delete(`${baseURL}/SupplierMasterContractObject/${id}`);
            if (response.status!==200) {
                throw new Error(`Failed to fetch parts: ${response.statusText}`);
            }
            return await response;
        } catch (error) {
            console.error('Error fetching parts:', error);
            return null;
        }
    }

    async addPart(partData) {
        try {
            const response = await axios.post(`${this.baseURL}/SupplierMasterObject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(partData)
            });
            if (response.status!=200) {
                throw new Error(`Failed to add part: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding part:', error);
            return null;
        }
    }

    async updatePart(id,partData) {
        try {
            const response = await axios.post(`${this.baseURL}/SupplierMasterObject/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(partData)
            });
            if (response.status!=200) {
                throw new Error(`Failed to add part: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding part:', error);
            return null;
        }
    }
}

export default DocumentServices;
