import { configureStore, combineReducers, compose } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { userLoginSlice } from "./features/User/loginSlice";
import { userCheckCodeSlice } from "./features/User/checkcodeSlice";
import { userSignupWorkerSlice } from "./features/User/signupWorkerSlice";
import { userSignupEmployerSlice } from "./features/User/signupEmployerSlice";
import { AddAddressSlice } from "./features/User/Employer/addAddressSlice";
import { GetAddressSlice } from "./features/User/Employer/getAddressSlice";

const rootReducer = combineReducers({
  userLogin: userLoginSlice.reducer,
  userCheckCode: userCheckCodeSlice.reducer,
  userSignupWorker: userSignupWorkerSlice.reducer,
  userSignupEmployer: userSignupEmployerSlice.reducer,
  AddAddress: AddAddressSlice.reducer,
  GetAddress: GetAddressSlice.reducer
});

const store = configureStore(
  {
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk]
  },
  (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
    compose
);

export default store;
