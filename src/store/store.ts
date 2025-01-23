import {configureStore} from '@reduxjs/toolkit';
import companyReducer from './slices/CompanySlice';
import contactsReducer from './slices/ContactsSlice';
import agentReducer from './slices/AgentSlice';

export const store = configureStore({
  reducer: {
    company: companyReducer,
    contacts: contactsReducer,
    agent: agentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
