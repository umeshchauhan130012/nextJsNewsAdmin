import axios from "axios";
const apiClient = axios.create({
   baseURL: "/api",
  timeout: 3600000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Login api
export const loginApi = async (endpoint, payload) => {
  try {
    const response = await apiClient.post(endpoint, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const profileGet = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create request (Create)
export const createTags = async (endpoint, payload) => {
  try {
    const response = await apiClient.post(endpoint, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// GET request (all or by ID)
export const getTags = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// PUT request (update)
export const putTags = async (endpoint, payload) => {
  try {
    const response = await apiClient.put(endpoint, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// DELETE request
export const deleteTags = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
  
// Create request (Create)
export const createCategory = async (endpoint, payload) => {
  try {
    const response = await apiClient.post(endpoint, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// GET request (all or by ID)
export const getCategory = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// PUT request (update)
export const putCategory = async (endpoint, payload) => {
  try {
    const response = await apiClient.put(endpoint, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// DELETE request
export const deleteCategory = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
  
export const createStory = async (endpoint, formData) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await apiClient.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// GET request (all)
export const getStory = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// PUT request (update)
export const putStory = async (endpoint, formData) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await apiClient.put(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteStory = async (endpoint) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//header logo 
export const createHeaderLogo = async (endpoint, formData) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await apiClient.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// GET request (all)
export const getHeaderLogo = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// PUT request (update)
export const putHeaderLogo = async (endpoint, formData) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await apiClient.put(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteHeaderLogo = async (endpoint) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//footer logo 
export const createFooterLogo = async (endpoint, formData) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await apiClient.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// GET request (all)
export const getFooterLogo = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// PUT request (update)
export const putFooterLogo = async (endpoint, formData) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await apiClient.put(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteFooterLogo = async (endpoint) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


