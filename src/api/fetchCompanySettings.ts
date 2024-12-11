import axios from 'axios';

const fetchCompanySettings = async (companyCode: string) => {
  try {
    const response = await axios.get(
      `https://lic.comstice.com/agentsettings/${companyCode}`,
    );
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    } else {
      throw new Error('Invalid data format or empty response.');
    }
  } catch (error) {
    console.error('Error fetching company settings:', error);
    throw error;
  }
};

export default fetchCompanySettings;
