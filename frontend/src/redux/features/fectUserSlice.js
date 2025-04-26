import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],    
}

const fetchUserSlice = createSlice({
  name: 'fetchUser',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload)
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user._id === action.payload._id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    }
  }
})

export const { setUsers, addUser, removeUser, updateUser } = fetchUserSlice.actions
export default fetchUserSlice.reducer
