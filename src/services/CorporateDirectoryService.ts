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
  {name: 'Emily', lastname: 'Johnson', company: 'Delta Systems'},
  {name: 'Ethan', lastname: 'Brown', company: 'Delta Systems'},
  {name: 'Sophia', lastname: 'Martinez', company: 'Echo Solutions'},
  {name: 'Liam', lastname: 'Lopez', company: 'Omega Group'},
  {name: 'Olivia', lastname: 'Garcia', company: 'PrimeTech'},
  {name: 'Noah', lastname: 'Wilson', company: 'BlueSky Inc.'},
  {name: 'Mia', lastname: 'Lee', company: 'NextGen Co.'},
  {name: 'Lucas', lastname: 'Davis', company: 'FutureTech'},
  {name: 'Amelia', lastname: 'Clark', company: 'SilverWave'},
  {name: 'Benjamin', lastname: 'Anderson', company: 'CoreLogic'},
  {name: 'Charlotte', lastname: 'Perez', company: 'TruePoint'},
  {name: 'James', lastname: 'White', company: 'GreenFields'},
  {name: 'Harper', lastname: 'Taylor', company: 'Horizon Group'},
  {name: 'Alexander', lastname: 'Harris', company: 'VisionWorks'},
  {name: 'Isabella', lastname: 'Young', company: 'InnoTech'},
  {name: 'Henry', lastname: 'King', company: 'AlphaWave'},
  {name: 'Ella', lastname: 'Scott', company: 'Pioneer Solutions'},
  {name: 'Samuel', lastname: 'Adams', company: 'BrightFuture'},
  {name: 'Avery', lastname: 'Green', company: 'SkyTech Co.'},
  {name: 'Jack', lastname: 'Baker', company: 'BlueStream'},
  {name: 'Lily', lastname: 'Nelson', company: 'Infinity Corp.'},
  {name: 'William', lastname: 'Hall', company: 'Quantum Inc.'},
  {name: 'Grace', lastname: 'Moore', company: 'NextEra'},
  {name: 'Matthew', lastname: 'Rivera', company: 'Elite Solutions'},
  {name: 'Scarlett', lastname: 'Campbell', company: 'TrueWave'},
  {name: 'Daniel', lastname: 'Mitchell', company: 'TechNova'},
  {name: 'Victoria', lastname: 'Carter', company: 'BrightEdge'},
  {name: 'Andrew', lastname: 'Ramirez', company: 'SilverTech'},
  {name: 'Hannah', lastname: 'Phillips', company: 'WaveWorks'},
  {name: 'Joshua', lastname: 'Evans', company: 'PrimeLogic'},
  {name: 'Ella', lastname: 'Roberts', company: 'EcoPoint'},
  {name: 'Ryan', lastname: 'Murphy', company: 'BlueNova'},
  {name: 'Aria', lastname: 'Gonzalez', company: 'CoreWave'},
  {name: 'David', lastname: 'Martinez', company: 'InspireTech'},
  {name: 'Sophie', lastname: 'Alexander', company: 'TrueLogic'},
  {name: 'Eli', lastname: 'Wright', company: 'BrightTech'},
  {name: 'Madison', lastname: 'Hughes', company: 'GreenWave'},
  {name: 'Christopher', lastname: 'Hernandez', company: 'FutureLogic'},
  {name: 'Aubrey', lastname: 'Cox', company: 'BrightCore'},
  {name: 'Jonathan', lastname: 'Diaz', company: 'ElitePoint'},
  {name: 'Elizabeth', lastname: 'Bell', company: 'SkySolutions'},
  {name: 'Anthony', lastname: 'Cooper', company: 'TrueFuture'},
  {name: 'Layla', lastname: 'Parker', company: 'GreenLogic'},
  {name: 'Thomas', lastname: 'Howard', company: 'NextCore'},
  {name: 'Zoey', lastname: 'Ward', company: 'PrimeEdge'},
  {name: 'Sebastian', lastname: 'Turner', company: 'Infinity Tech'},
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
