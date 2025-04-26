import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedUser: {
    fullName: '',
    gender: '',
    profilePhoto: '',
    userName: '',
    _id: '',
    __v: 0
  }
};

const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      // Ensure we're properly updating the entire selectedUser object
      state.selectedUser = {
        fullName: action.payload.fullName || '',
        gender: action.payload.gender || '',
        profilePhoto: action.payload.profilePhoto || '',
        userName: action.payload.userName || '',
        _id: action.payload._id || '',
        __v: action.payload.__v || 0
      };
    },
    clearSelectedUser: (state) => {
      state.selectedUser = initialState.selectedUser;
    }
  }
});

export const { setSelectedUser, clearSelectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;
