import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cart from "./cart-slice";
import dialog from "./dialog-slice";
import expandSidebar from "./expand-slice";

export type IRootState = ReturnType<typeof reducer>;

const reducers = combineReducers({
    cart,
    dialog,
    expandSidebar,
});

const config = {
    key: "root",
    storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});

export default store;