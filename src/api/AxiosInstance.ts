import axios from "axios";
import { store } from "../redux/store";
import { setAccessToken, clearAccessToken } from "../redux/slices/authSlice";
import { ERROR_MESSAGES } from "../constants/ErrorMessage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post(
          "/refresh-token",
          {},
          { withCredentials: true }
        );

        const { accessToken } = res.data;
        if (accessToken) {
          store.dispatch(setAccessToken(accessToken));
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        store.dispatch(clearAccessToken());
        return Promise.reject(err);
      }
    }

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error(data?.message || ERROR_MESSAGES.BAD_REQUEST);
          break;
        case 401:
          console.error(data?.message || ERROR_MESSAGES.UNAUTHORIZED);
          break;
        case 403:
          console.error(data?.message || ERROR_MESSAGES.FORBIDDEN);
          break;
        case 404:
          console.error(data?.message || ERROR_MESSAGES.NOT_FOUND);
          break;
        case 500:
          console.error(data?.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
          break;
        default:
          console.error(data?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG);
      }
    } else if (error.request) {
      console.error(ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      console.error(error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
