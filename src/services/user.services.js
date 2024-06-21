import { isAuthenticated } from "../utils/helper";
import api from "./api";

const baseURL = "http://localhost:8181";

class UserServices {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async getUSerById(id) {
    try {
      const response = await api.get(
        `${baseURL}/getByIdRegisterUserWithThink/${id}`,
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

  async getAllUser() {
    try {
      const response = await api.get(
        `${baseURL}/getAllRegisterUserWithThink`,
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

  async getSelectiveUser(text) {
    try {
      const response = await api.get(
        `${baseURL}/getBySupplierUsers/${text}`,
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

  async getUserByMultipleIds(ids) {
    try {
      const response = await api.get(
        `${baseURL}/getByIdsSelectiveUsers?${ids}`,
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

  

    async searchByuserName(name) {
      try {
        const response = await api.get(
          `${baseURL}/getByUserName/${name}`,
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

}

export default UserServices;
