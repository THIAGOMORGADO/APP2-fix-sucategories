import { combineReducers } from '@reduxjs/toolkit';

import authSlice, { type AuthProps } from './authSlice';

export interface RootState {
  auth: AuthProps;
}

const rootReducer = combineReducers<RootState>({
  auth: authSlice,
});

export default rootReducer;
