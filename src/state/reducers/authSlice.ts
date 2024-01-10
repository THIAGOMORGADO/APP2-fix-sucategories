import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthProps {
  authenticated: boolean;
  authorized: boolean;
  token: string | null;
  error: object | string | boolean;
}

const authInitialState: AuthProps = {
  authenticated: false,
  authorized: false,
  token: null,
  error: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    authenticated: (
      state: AuthProps,
      action: PayloadAction<AuthProps>
    ) => ({
      ...state,
      authenticated: action.payload.authenticated,
      authorized: action.payload.authorized,
      token: action.payload.token,
      error: action.payload.error,
    }),
    unauthorized: (state: AuthProps) => ({
      ...state,
      authInitialState,
    }),
    notAuthenticated: (state: AuthProps) => ({
      ...state,
      authenticated: false,
    }),
    authenticationError: (
      state: AuthProps,
      action: PayloadAction<AuthProps>
    ) => ({
      ...state,
      error: action.payload.error,
    }),
  },
});

export const {
  authenticated,
  unauthorized,
  notAuthenticated,
  authenticationError,
} = authSlice.actions;

export default authSlice.reducer;
