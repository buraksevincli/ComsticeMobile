import axios from 'axios';

const sendLoginFinesseRequest = async () => {
  try {
    const url =
      'https://finesseext.comstice.com:8445/finesse/api/User/kaanwebrtc';

    const xmlBody = `
      <User>
        <state>LOGIN</state>
        <extension>6034</extension>
      </User>
    `;

    const username = 'kaanwebrtc';
    const password = '12345';
    const auth = btoa(`${username}:${password}`);

    const response = await axios.put(url, xmlBody, {
      headers: {
        'Content-Type': 'application/xml',
        Authorization: `Basic ${auth}`,
      },
    });

    console.log('Response.Config.Data:', response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error:', error.response?.data || error.message);
    } else {
      console.error('Error:', (error as Error).message);
    }
  }
};

const sendChangeState = async () => {
  try {
    const url =
      'https://finesseext.comstice.com:8445/finesse/api/User/kaanwebrtc';

    const xmlBody2 = `
        <User>
          <state>READY</state>
        </User>
      `;

    const username = 'kaanwebrtc';
    const password = '12345';
    const auth = btoa(`${username}:${password}`);

    const response = await axios.put(url, xmlBody2, {
      headers: {
        'Content-Type': 'application/xml',
        Authorization: `Basic ${auth}`,
      },
    });

    console.log('Response.Config.Data:', response.config.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error:', error.response?.data || error.message);
    } else {
      console.error('Error:', (error as Error).message);
    }
  }
};

export {sendLoginFinesseRequest, sendChangeState};
