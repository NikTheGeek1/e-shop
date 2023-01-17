import { createSlice } from "@reduxjs/toolkit";

type DialogType = {
  show: boolean;
  header: string;
  msgs: {type: string, msg: string}[];
  link: {
    link: string;
    text: string;
  };
};

const initialState: DialogType = {
  show: false,
  header: "",
  msgs: [],
  link: {
    link: "",
    text: "",
  },
};

export const DialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showDialog(state, action) {
      state.show = true;
      state.header = action.payload.header;
      state.msgs = action.payload.msgs;
      state.link = action.payload.link;
    },
    hideDialog(state, action) {
      state.show = false;
      state.header = "";
      state.msgs = [];
      state.link = {link: "", text: ""};
    },
  },
});

export const { showDialog, hideDialog } = DialogSlice.actions;

export default DialogSlice.reducer;
