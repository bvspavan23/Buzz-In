import { createSlice } from "@reduxjs/toolkit";

const buzzSlice = createSlice({
  name: "buzzer",
  initialState: {
    name: "",
    roomId: ""
  },
  reducers: {
    storeAction: (state, action) => {
      const { name, roomId } = action.payload;
      state.name = name;
      state.roomId = roomId;
    },
  },
});

export const { storeAction } = buzzSlice.actions;
export default buzzSlice.reducer;
