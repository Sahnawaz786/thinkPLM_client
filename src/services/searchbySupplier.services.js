import { isAuthenticated } from "../utils/helper";
import api from "./api";

const baseURL = "http://localhost:8181";

class SearchByPandD {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async getPartsData(name) {
    try {
      const response = await api.get(
        `${baseURL}/SearchPartSupplierMasterObject/${name}`,
        {
          headers: { Authorization: `Bearer ${isAuthenticated()}` },
        }
      );
      if (response.status !== 200) {
        throw new Error(`Failed to fetch parts: ${response.statusText}`);
      }
      return await response;
    } catch (error) {
      console.error("Error fetching parts:", error);
      return null;
    }
  }

  async getSupplierContractData(name) {
    console.log("Token", isAuthenticated);
    try {
      const response = await api.get(`${baseURL}/SearchContractBySupplierMasterContractObject/${name}`, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` },
      });
      if (response.status !== 200) {
        throw new Error(`Failed to fetch parts: ${response.statusText}`);
      }
      return await response;
    } catch (error) {
      console.error("Error fetching parts:", error);
      return null;
    }
  }

  async getInvoiceData(name) {
    try {
      const response = await api.get(`${baseURL}/SearchInvoiceByInvoiceMasterObject/${name}`, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` },
      });
      if (response.status !== 200) {
        throw new Error(`Failed to fetch parts: ${response.statusText}`);
      }
      return await response;
    } catch (error) {
      console.error("Error fetching parts:", error);
      return null;
    }
  }

  async getComplianceData(name) {
    try {
      const response = await api.get(
        `${baseURL}/SearchCompilanceByComplainceCertificateMasterObject/${name}`,
        {
          headers: { Authorization: `Bearer ${isAuthenticated()}` },
        }
      );
      if (response.status !== 200) {
        throw new Error(`Failed to fetch parts: ${response.statusText}`);
      }
      return await response;
    } catch (error) {
      console.error("Error fetching parts:", error);
      return null;
    }
  }

  async getCertificateData(name) {
    try {
      const response = await api.get(`${baseURL}/SearchCertificationByCertification_of_InsuranceMasterObject/${name}`, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` },
      });
      if (response.status !== 200) {
        throw new Error(`Failed to fetch parts: ${response.statusText}`);
      }
      return await response;
    } catch (error) {
      console.error("Error fetching parts:", error);
      return null;
    }
  }
}

export default SearchByPandD;
