import {configureStore} from '@reduxjs/toolkit';
import companyReducer from './slices/CompanySlice';
import contactsReducer from './slices/ContactsSlice';

export const store = configureStore({
  reducer: {
    company: companyReducer,
    contacts: contactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
