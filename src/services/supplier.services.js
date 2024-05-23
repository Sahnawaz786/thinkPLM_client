import axios from 'axios';

const baseURL = 'http://localhost:8181';

class SupplierServices {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getSupplier() {
        try {
            const response = await axios.get(`${baseURL}/KKHSupplierMasterObject`);
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
            const response = await axios.get(`${baseURL}/KKHSupplierMasterObject1/${id}`);
            if (response.status!==200) {
                throw new Error(`Failed to fetch parts: ${response.statusText}`);
            }
            return await response;
        } catch (error) {
            console.error('Error fetching parts:', error);
            return null;
        }
    }

    async getSupplierHistoryById(id) {
        try {
            const response = await axios.get(`${baseURL}/KKHSupplierMasterObject/${id}`);
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
            const response = await axios.delete(`${baseURL}/KKHSupplierMasterObject/${id}`);
            if (response.status!==200) {
                throw new Error(`Failed to fetch parts: ${response.statusText}`);
            }
            return await response;
        } catch (error) {
            console.error('Error fetching parts:', error);
            return null;
        }
    }

    async updateSupplier(supplierData) {
        try {
            const response = await axios.post(`${this.baseURL}/updateSuppliers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(supplierData)
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
  }

export default SupplierServices;
