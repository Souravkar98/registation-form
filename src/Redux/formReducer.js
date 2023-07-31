import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    users: [],
    isEdit: false,
    editUserId: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setSeletedUserId: (state, action) => {
      state.editUserId = action.payload;
    },
    updateUser: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updatedData };
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
    },
  },
});

export const { addUser, deleteUser, setIsEdit, setSeletedUserId,updateUser } =
  formSlice.actions;

export default formSlice.reducer;
