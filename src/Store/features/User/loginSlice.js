import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import axiosInstance from "../../../axios";
import history from "../../../History/history";


const API_URL = "http://api.walnutia.ir";

export const loginEmployer = createAsyncThunk(
    'user/loginEmployer',
    async ( { Phone } , thunkAPI) => {
        try {
            let myData = new FormData();
            myData.append("Phone", Phone);
            localStorage.setItem("PhoneNumber", Phone);
            localStorage.setItem("isWorker", "false");
            localStorage.setItem("isEmployer", "true");
            const response = await axiosInstance.post(
                API_URL + "/Employer/Login", myData
            )
            if (response.status === 200) {
                history.push({ pathname: "/Getcode" });
                return myData;
            } else {
                return thunkAPI.rejectWithValue(myData)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    history.push({ pathname: "/Signup-employer" });
                    useDispatch({
                        payload: {
                            message:error.response,
                            type:"error",
                        },
                    });
                }
            } thunkAPI.rejectWithValue(error.response.data);
        }  
    },
)

export const loginWorker = createAsyncThunk(
    'user/loginWorker',
    async ( { Phone } , thunkAPI ) => {
        try {
            let myData = new FormData();
            myData.append("Phone", Phone);
            localStorage.setItem("phoneNumber", Phone);
            localStorage.setItem("isWorker", "true");
            localStorage.setItem("isEmployer", "false");
            const response = await axiosInstance.post(
                API_URL + "/Worker/Login", myData
            )
            if (response.status === 200) {
                history.push({ pathname: "/Getcode" });
                return myData;
            } else {
                return thunkAPI.rejectWithValue(myData)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    history.push({ pathname: "/Signup-worker" });
                    useDispatch({
                        payload: {
                            message:error.response,
                            type:"error",
                        },
                    });
                }
            } thunkAPI.rejectWithValue(error.response.data);
        }  
    },
)

export const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        Phone: "",
        isFetching: false,
        isSuccess: false,
        isError: false,
    },
    reducers: { 
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
            
        },
     },
    extraReducers: {
        [loginEmployer.fulfilled]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            return state;

        },
        [loginEmployer.pending]: (state) => {
            state.isFetching = true;
        },
        [loginEmployer.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        [loginWorker.fulfilled]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            return state;

        },
        [loginWorker.pending]: (state) => {
            state.isFetching = true;
        },
        [loginWorker.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        }
    }
})

export const  {clearState}  = userLoginSlice.actions;
export const userSelector = state => state.userLogin;