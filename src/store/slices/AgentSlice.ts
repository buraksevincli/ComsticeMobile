import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AgentState {
  username: string;
  password: string;
  extension: string;
}

const initialState: AgentState = {
  username: '',
  password: '',
  extension: '',
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setAgentData: (state, action: PayloadAction<Partial<AgentState>>) => {
      return {...state, ...action.payload};
    },
    clearAgentData: () => initialState,
  },
});

export const {setAgentData, clearAgentData} = agentSlice.actions;

export default agentSlice.reducer;
