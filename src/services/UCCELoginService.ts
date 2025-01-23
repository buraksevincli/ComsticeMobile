import axios from 'axios';

const BASE_URL = 'https://ppg1.comstice.com:2778/v2';
const FINESSE_URL = 'https://ppg1.comstice.com:8445/finesse/api';

export const ucceLoginService = {
  async finesseLogin(username: string, password: string, extension: string) {
    const url = `${FINESSE_URL}/User/${username}`;
    const xmlBody = `
          <User>
            <state>LOGIN</state>
            <extension>${extension}</extension>
            <mobileAgent>
            <mode>CALL_BY_CALL</mode>
            <dialNumber>900100013613206250</dialNumber>
            </mobileAgent>
          </User>
        `;
    const auth = btoa(`${username}:${password}`);

    try {
      const response = await axios.put(url, xmlBody, {
        headers: {
          'Content-Type': 'application/xml',
          Authorization: `Basic ${auth}`,
        },
      });

      console.log('Finesse Login Response:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Finesse Login Error:',
          error.response?.data || error.message,
        );
      } else {
        console.error('Finesse Login Error:', (error as Error).message);
      }
      throw error;
    }
  },

  async keepAliveLoginWithToken(
    username: string,
    password: string,
    host: string,
    token: string,
  ) {
    try {
      const response = await axios.post(
        `${BASE_URL}/keepalive/login`,
        {
          username,
          password,
          host,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Keepalive failed with status ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response?.data || error.message);
        console.error('Request Config:', error.config);
        console.error('Response Headers:', error.response?.headers);
      } else {
        console.error('General Error:', (error as Error).message);
      }
      throw error;
    }
  },

  async keepAliveLogoutWithToken(
    username: string,
    password: string,
    token: string,
  ) {
    try {
      const response = await axios.post(
        `${BASE_URL}/keepalive/logout`,
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Keepalive failed with status ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response?.data || error.message);
        console.error('Request Config:', error.config);
        console.error('Response Headers:', error.response?.headers);
      } else {
        console.error('General Error:', (error as Error).message);
      }
      throw error;
    }
  },
};
