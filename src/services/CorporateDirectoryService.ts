import axios from 'axios';

export interface CorporateDirectoryContact {
  name: string;
  lastname: string;
  company: string;
}

const dummyCorporateDirectory: CorporateDirectoryContact[] = [
  {name: 'Jane', lastname: 'Doe', company: 'TechCorp'},
  {name: 'John', lastname: 'Smith', company: 'TechCorp'},
  {name: 'Adele', lastname: 'Vasquez', company: 'Alpha Inc.'},
  {name: 'Arthur', lastname: 'Hudson', company: 'Beta Ltd.'},
  {name: 'Alvin', lastname: 'Mccarthy', company: 'Gamma Co.'},
];

export const fetchCorporateDirectory = async (searchTerm: {
  name: string;
  lastname: string;
  company: string;
}): Promise<CorporateDirectoryContact[]> => {
  try {
    const useDummyData = true;
    if (useDummyData) {
      return new Promise(resolve => {
        setTimeout(() => resolve(dummyCorporateDirectory), 500);
      });
    }

    const response = await axios.get(
      'https://api.example.com/corporate-directory',
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch corporate directory data.');
  }
};
