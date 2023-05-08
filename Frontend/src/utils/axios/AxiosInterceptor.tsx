import axios from "axios";

/**
 * Configuring Axios instance using the axios create method and passing the base Url of the interceptor.
 */
export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
export const ConfigAxios=axios.create({
  baseURL: process.env.REACT_APP_CONFIG_URL,
});

export const UtilsAxios=axios.create({
  baseURL: process.env.REACT_APP_UTILS_URL,
});

export const CurrencyAxios=axios.create({
  baseURL: process.env.REACT_APP_CURRENCY_CONVERTER_URL,
});

/**
 * The interceptor adds an Authorization header with a JWT token from the current authenticated user's session to each outgoing request using an interceptor.
 */

