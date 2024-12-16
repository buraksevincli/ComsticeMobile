import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchPersonalContacts,
  PersonalContact,
} from '../../services/ContactsService';
import {
  fetchCorporateDirectory,
  CorporateDirectoryContact,
} from '../../services/CorporateDirectoryService';

interface ContactsState {
  personalContacts: PersonalContact[];
  corporateDirectory: CorporateDirectoryContact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  personalContacts: [],
  corporateDirectory: [],
  loading: false,
  error: null,
};

// Async thunk for fetching personal contacts
export const fetchContactsThunk = createAsyncThunk(
  'contacts/fetchPersonalContacts',
  async (_, {rejectWithValue}) => {
    try {
      return await fetchPersonalContacts();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Async thunk for fetching corporate directory
export const fetchCorporateDirectoryThunk = createAsyncThunk(
  'contacts/fetchCorporateDirectory',
  async (
    searchTerm: {name: string; lastname: string; company: string},
    {rejectWithValue},
  ) => {
    try {
      return await fetchCorporateDirectory(searchTerm);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Personal Contacts
      .addCase(fetchContactsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.personalContacts = action.payload;
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Corporate Directory
      .addCase(fetchCorporateDirectoryThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCorporateDirectoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.corporateDirectory = action.payload;
      })
      .addCase(fetchCorporateDirectoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default contactsSlice.reducer;
