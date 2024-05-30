import axios from "axios";

let isRefreshing = false;
let refreshQueue = [];

const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/refresh`,
      {
        refreshToken: localStorage.getItem("refreshToken"),
      }
    );
    localStorage.setItem("accessToken", response.data.accessToken);
    refreshQueue.forEach((prom) => prom.resolve());
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    refreshQueue.forEach((prom) => prom.reject(error));
    throw error;
  } finally {
    isRefreshing = false;
    refreshQueue = [];
  }
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response && error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      try {
        await refreshToken();
        const accessToken = localStorage.getItem("accessToken");
        originalConfig.headers["Authorization"] = `Bearer ${accessToken}`;
        return axios(originalConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    } else if (error.response && error.response.status === 401) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      })
        .then(async () => {
          const accessToken = localStorage.getItem("accessToken");
          originalConfig.headers["Authorization"] = `Bearer ${accessToken}`;
          return axios(originalConfig);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
