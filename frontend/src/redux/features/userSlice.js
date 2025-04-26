import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    fullName: '',
    gender: '',
    password: '',
    profilePhoto: '',
    userName: '',
    __v: 0,
    _id: ''
  },
  isAuthenticated: false,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        fullName: action.payload.fullName,
        gender: action.payload.gender,
        password: action.payload.password,
        profilePhoto: action.payload.profilePhoto,
        userName: action.payload.userName,
        __v: action.payload.__v,
        _id: action.payload._id
      };
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = initialState.user;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
