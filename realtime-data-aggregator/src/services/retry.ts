import axios, { AxiosRequestConfig } from 'axios';

export async function axiosWithBackoff(
  config: AxiosRequestConfig,
  maxRetries = 5,
  baseDelay = 500
) {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      return await axios(config);
    } catch (err: any) {
      const status = err?.response?.status;
      // Only retry on 429 or network errors
      if (status !== 429 && !err.code) throw err;
      if (attempt === maxRetries) throw err;
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(res => setTimeout(res, delay));
      attempt++;
    }
  }
  throw new Error('Max retries reached');
}