import axios from 'axios';
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
            const response = await axios.get(`${baseURL}/ComplainceCertificateMasterObject`);
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

    async getComplianceDocumentById(id) {
        try {
            const response = await axios.get(`${baseURL}/ComplainceCertificateMasterObject1/${id}`);
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
            const response = await axios.get(`${baseURL}/ComplainceCertificateMasterObject/${id}`);
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

    async deleteComplianceDocumentById(id) {
        try {
            const response = await axios.delete(`${baseURL}/ComplainceCertificateMasterObject/${id}`);
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

export default ComplianceServices;
