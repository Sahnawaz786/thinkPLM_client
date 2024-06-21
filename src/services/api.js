import axios from 'axios';


// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8181', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    console.error('No refresh token available');
    return;
  }

  try {
    const token =localStorage.getItem("accessToken")
    const response = await axios.post('http://localhost:8181/refreshToken', { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const newAccessToken = response.data.accessToken;
    console.log("newToken",newAccessToken)
    localStorage.setItem('accessToken', newAccessToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  } catch (refreshError) {
    console.error('Token refresh failed:', refreshError);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';

    // Optionally redirect to login or handle refresh failure
  }
};

// Set an interval to refresh the token every 10 minutes
setInterval(refreshAccessToken,1410000); // 600,000 milliseconds = 10 minutes
//1410000
export default api;


