import axios from 'axios';

const baseURL = 'http://localhost:8181';

class SupplierServices {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getSupplier() {
        try {
            const response = await axios.get(`${baseURL}/getsuppliers`);
            if (response.status!==200) {
                throw new Error(`Failed to fetch parts: ${response.statusText}`);
            }
            return await response;
        } catch (error) {
            console.error('Error fetching parts:', error);
            return null;
        }
    }

    async getSupplierById(id) {
        try {
            const response = await axios.get(`${baseURL}/getsuppliers/${id}`);
            if (response.status!==200) {
                throw new Error(`Failed to fetch parts: ${response.statusText}`);
            }
            return await response;
        } catch (error) {
            console.error('Error fetching parts:', error);
            return null;
        }
    }

    async deleteSupplier(id) {
        try {
            const response = await axios.delete(`${baseURL}/getsuppliers/${id}`);
            if (response.status!==200) {
                throw new Error(`Failed to fetch parts: ${response.statusText}`);
            }
            return await response;
        } catch (error) {
            console.error('Error fetching parts:', error);
            return null;
        }
    }

    async addSupplier(partData) {
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

export default SupplierServices;
