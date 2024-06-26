import { v4 as uuidv4 } from "uuid";
import { isAuthenticated } from '../utils/helper';
import api from './api';

// const dotenv = require('dotenv');

// dotenv.config({ path: '../.env' });

// const baseURL = process.env.baseURL;

const baseURL = 'http://localhost:8181';
const uniqueIds = 1044646464646;
class BomServices {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
   
    async getBomById(id) {
        try {
            const response = await api.get(`${baseURL}/getPartStructure/${id}`, {
                headers: { Authorization: `Bearer ${isAuthenticated()}`},
            });
            console.log('====================================');
            console.log({response});
            console.log('====================================');
            if (response.status!==200) {
                throw new Error(`Failed to fetch parts: ${response.statusText}`);
            }
            const tempData = response?.data?.partBomDetailsList?.map((elem, i) => {
                return {...elem, uniqueId: uuidv4()}
            })
            const partBomDetailsList = { ...response?.data, partBomDetailsList: tempData}
            console.log({sajjad: partBomDetailsList})
            return partBomDetailsList ;
        } catch (error) {
            console.error('Error fetching parts:', error);
            return null;
        }
    }

    async editPartById(id,partData) {
        try {
            const response = await api.put(`${this.baseURL}/SupplierMasterObject/${id}`,partData);

            if (response.status!=200) {
                throw new Error(`Failed to add part: ${response.statusText}`);
            }
            return await response;
        } catch (error) {
            console.error('Error adding part:', error);
            return null;
        }
    }

    async searchBomPart(partNumber) {
        try {
            const response = await api.get(`${baseURL}/Supplier_MasterPartObjectBypart_number/${partNumber}`, {
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

            const response = await api.get(`${baseURL}/SupplierMasterObject/${id}`);
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

    async deletePart(id) {
        try {
            const response = await api.delete(`${baseURL}/SupplierMasterObject/${id}`);
            if (response.status!==200) {
                throw new Error(`Failed to fetch parts: ${response.statusText}`);
            }
            return await response;
        } catch (error) {
            console.error('Error fetching parts:', error);
            return null;
        }
    }

    async addBomPart(payload) {
        console.log({payload});
        try {
            const response = await api.post(`${baseURL}/createUsageLink`, payload, {
                headers: { Authorization: `Bearer ${isAuthenticated()}`},
            });
            console.log({response})
            return response;
        } catch (error) {
            console.error('Error adding part:', error);
            return null;
        }
    }

    async deleteBomPart(payload) {
        console.log({payload});
        const { ida3a5, ida3b5 } = payload || {};
        try {
            const response = await api.delete(`${baseURL}/entities/${ida3a5}/${ida3b5}`, {
                headers: { Authorization: `Bearer ${isAuthenticated()}`},
            } ,payload);
            console.log({response})
            return response;
        } catch (error) {
            console.error('Error adding part:', error);
            return Promise.reject(error);
        }
    }

    async updatePart(id,partData) {
        try {
            const response = await api.post(`${this.baseURL}/SupplierMasterObject/${id}`, {
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

export default BomServices;
