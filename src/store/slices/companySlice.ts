import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CompanyState {
  companyCode: string;
  model: string;
  version: string;
  logourl: string;
  loginWithSso: string;
  token: string;
  finesse1: string;
  crmurl: string;
}

const initialState: CompanyState = {
  companyCode: '',
  model: '',
  version: '',
  logourl: '',
  loginWithSso: '',
  token: '',
  finesse1: '',
  crmurl: '',
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyData: (state, action: PayloadAction<Partial<CompanyState>>) => {
      return {...state, ...action.payload};
    },
    clearCompanyData: () => initialState,
  },
});

export const {setCompanyData, clearCompanyData} = companySlice.actions;

export default companySlice.reducer;
