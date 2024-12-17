import axios from 'axios';

export interface Voicemail {
  id: string;
  number: string;
  duration: string;
  date: string;
}

const dummyVoicemails: Voicemail[] = [
  {id: '1', number: '+1-202-555-0197', duration: '00:56', date: '11:34'},
  {id: '2', number: '+1-202-555-0154', duration: '01:22', date: 'Yesterday'},
  {
    id: '3',
    number: 'Maximilian Gallagher',
    duration: '01:08',
    date: 'Yesterday',
  },
  {id: '4', number: '+1-555-4023019', duration: '00:56', date: 'Yesterday'},
  {id: '5', number: 'Aston Gray', duration: '00:32', date: 'Yesterday'},
  {id: '6', number: '+1-202-555-0149', duration: '00:47', date: '10/15/2024'},
  {id: '7', number: '+1-202-555-0181', duration: '01:32', date: '10/15/2024'},
  {id: '8', number: 'Brandon Robinson', duration: '01:27', date: '10/15/2024'},
  {id: '9', number: '+1-202-555-0169', duration: '00:24', date: '10/14/2024'},
  {id: '10', number: '+1-202-555-2244', duration: '00:36', date: '10/14/2024'},
  {id: '11', number: 'Elijah Taylor', duration: '00:51', date: '10/13/2024'},
  {id: '12', number: '+1-202-555-0175', duration: '01:12', date: '10/13/2024'},
  {id: '13', number: 'Sophia Martinez', duration: '01:45', date: '10/12/2024'},
  {id: '14', number: '+1-202-555-0111', duration: '00:39', date: '10/12/2024'},
  {id: '15', number: 'William Johnson', duration: '01:15', date: '10/11/2024'},
  {id: '16', number: '+1-202-555-0193', duration: '01:05', date: '10/11/2024'},
  {id: '17', number: 'Olivia White', duration: '01:08', date: '10/10/2024'},
  {id: '18', number: '+1-202-555-0214', duration: '00:41', date: '10/10/2024'},
  {id: '19', number: 'Liam Garcia', duration: '01:18', date: '10/09/2024'},
  {id: '20', number: '+1-202-555-0223', duration: '00:30', date: '10/09/2024'},
  {id: '21', number: 'Emma Davis', duration: '01:22', date: '10/08/2024'},
  {id: '22', number: '+1-202-555-0113', duration: '00:58', date: '10/08/2024'},
  {id: '23', number: 'James Miller', duration: '01:11', date: '10/07/2024'},
  {id: '24', number: '+1-202-555-0134', duration: '00:44', date: '10/07/2024'},
  {id: '25', number: 'Ava Wilson', duration: '01:25', date: '10/06/2024'},
  {id: '26', number: '+1-202-555-0145', duration: '00:32', date: '10/06/2024'},
  {id: '27', number: 'Mason Brown', duration: '00:49', date: '10/05/2024'},
  {id: '28', number: '+1-202-555-0156', duration: '01:19', date: '10/05/2024'},
  {id: '29', number: 'Isabella Jones', duration: '00:35', date: '10/04/2024'},
  {id: '30', number: '+1-202-555-0167', duration: '01:04', date: '10/04/2024'},
  {id: '31', number: 'Lucas Moore', duration: '00:52', date: '10/03/2024'},
  {id: '32', number: '+1-202-555-0178', duration: '00:45', date: '10/03/2024'},
  {id: '33', number: 'Charlotte Thomas', duration: '01:29', date: '10/02/2024'},
  {id: '34', number: '+1-202-555-0189', duration: '00:38', date: '10/02/2024'},
  {id: '35', number: 'Amelia Taylor', duration: '01:02', date: '10/01/2024'},
  {id: '36', number: '+1-202-555-0190', duration: '01:12', date: '10/01/2024'},
  {id: '37', number: 'Benjamin Harris', duration: '00:59', date: '09/30/2024'},
  {id: '38', number: '+1-202-555-0201', duration: '00:42', date: '09/30/2024'},
  {id: '39', number: 'Mia Clark', duration: '01:28', date: '09/29/2024'},
  {id: '40', number: '+1-202-555-0212', duration: '00:48', date: '09/29/2024'},
  {id: '41', number: 'Alexander Lewis', duration: '00:50', date: '09/28/2024'},
  {id: '42', number: '+1-202-555-0224', duration: '01:14', date: '09/28/2024'},
  {id: '43', number: 'Emily Walker', duration: '01:07', date: '09/27/2024'},
  {id: '44', number: '+1-202-555-0235', duration: '00:39', date: '09/27/2024'},
  {id: '45', number: 'Daniel Allen', duration: '01:06', date: '09/26/2024'},
  {id: '46', number: '+1-202-555-0246', duration: '00:51', date: '09/26/2024'},
  {id: '47', number: 'Sophia Scott', duration: '01:10', date: '09/25/2024'},
  {id: '48', number: '+1-202-555-0257', duration: '00:34', date: '09/25/2024'},
  {id: '49', number: 'Jack Green', duration: '01:17', date: '09/24/2024'},
  {id: '50', number: '+1-202-555-0268', duration: '00:40', date: '09/24/2024'},
];

export const fetchVoicemails = async (): Promise<Voicemail[]> => {
  try {
    const useDummyData = true;

    if (useDummyData) {
      return new Promise(resolve => {
        setTimeout(() => resolve(dummyVoicemails), 500);
      });
    }

    const response = await axios.get('https://api.example.com/voicemails');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch voicemails:', error);
    throw new Error('Failed to fetch voicemail data.');
  }
};
