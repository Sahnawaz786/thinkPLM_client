class DocumentServices {
    get path() {
      return /document;
    }
  
    async getDocuments() {
      try {
        const { data } = await API.get(/document/get_documents, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
    async recallDocument(documentId) {
      try {
        const { data } = await API.get(/document/recall/${documentId}, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async getDocument(id, payload) {
      try {
        const { data } = await API.post(/document/get_documents/${id}, payload, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async getDocumentSigner(id) {
      try {
        const { data } = await API.get(/document/document-signers/${id},  {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async getDocumentDetails(id, payload) {
      try {
        const { data } = await API.post(/document/get_documents/${id}, payload, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async getDocumentOTP(id) {
      try {
        const { data } = await API.get(/document/document-otp/${id}, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async addRecipientPositions(payload) {
      try {
        const { data } = await API.post(/document-recipient, payload, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async removeRecipientPositions(id) {
      try {
        const { data } = await API.put(/document-recipient/delete/${id}, {}, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        })
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
    async updateRecipientPositions({ payload, id }) {
      try {
        const { data } = await API.put(/document-recipient/update/${id}, payload, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        })
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async getSharedWithMeDocuments() {
      try {
        const { data } = await API.get(/document/get_shared_documents, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async createDocument(payload, orgName) {
      try {
        const { data } = await axios.post(${baseUrl}/document, payload, {
          headers: {
            Authorization: Bearer ${isAuthenticated()},
            Organization: orgName
          },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async deleteDocument(payload) {
      try {
        const { data } = await API.put(/document/delete_document, payload, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async getDocumentStatusCount() {
      try {
        const { data } = await API.get(/document/dashboard_status_counts, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
  
    async createSignedDocument(payload) {
      try {
        const { data } = await API.post(/document/create_signed_document, payload, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async updateMultipleDueDate(payload, id) {
      try {
        const { data } = await API.put(/document/update_default_duedate/${id}, payload, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async filterMyDocumentsBasedOnStatus(filter) {
      let { status = '', day = '', page = '' } = filter;
      status = status === 'all' ? '' : status;
      day = day === 'all' ? '' : day;
      try {
        const { data } = await API.get(/document/get_documents?status=${status}&days=${day}&page=${page}, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async filterSharedWithMeDocumentsBasedOnStatus(filter) {
      let { status = '', day = '', page = '' } = filter;
      status = status === 'all' ? '' : status;
      day = day === 'all' ? '' : day;
      try {
        const { data } = await API.get(/document/get_shared_documents?status=${status}&days=${day}&page=${page}, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async rejectDocument(payload){
      try {
      const { data } = await API.post(/document/reject, payload, {
        headers: { Authorization: Bearer ${isAuthenticated()} },
      });
      return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    async rejectGuestDocument(payload) {
      try {
        const { data } = await API.post(/document/guest-reject, payload, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
        } catch (error) {
          return Promise.reject(error);
        }
    }
  
    async updateAnnotationRecipient(payload) {
      try {
        const { recipientFeildId } = payload;
        const { data } = await API.put(/document-recipient/update_recipient/${recipientFeildId}, payload, {
          headers: { Authorization: Bearer ${isAuthenticated()} },
        });
        return data;
        } catch (error) {
          return Promise.reject(error);
        }
    }
  }