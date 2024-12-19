import axios from 'axios';

export interface Task {
  title: string;
  due_date: string;
  contactid: string;
  cust_name: string;
  company: string;
  action: string;
  details: string;
}

const dummyTasks: Task[] = [
  {
    title: 'Call John Smith',
    due_date: '2024-11-30 08:00:00',
    contactid: '09283098sf787sf9s8dfsadf',
    cust_name: 'John Smith',
    company: 'Interdata Inc.',
    action: 'call',
    details: 'Call the customer for the renewals',
  },
  {
    title: 'Pricing for CMG Shipment',
    due_date: '2024-11-23 10:00:00',
    contactid: '0926fghf7698a0a9s8dfsadf',
    cust_name: 'Karen VanGoethem',
    company: 'CMG Shipment',
    action: 'email',
    details: 'Send the latest pricing by email',
  },
  {
    title: 'Schedule Demo with BT Wholesale',
    due_date: '2024-11-20 10:00:00',
    contactid: '09283098e098a0lk32lk324k',
    cust_name: 'Annika Lindkvist',
    company: 'BT Wholesale',
    action: 'schedule',
    details: 'Schedule a call with the partner for the demo',
  },
];

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const useDummyData = true;

    if (useDummyData) {
      return new Promise(resolve => {
        setTimeout(() => resolve(dummyTasks), 500);
      });
    }

    const response = await axios.get('https://api.example.com/tasks');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw new Error('Failed to fetch task data.');
  }
};
