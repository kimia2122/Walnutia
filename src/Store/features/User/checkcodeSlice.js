import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import axiosInstance from "../../../axios";
import history from "../../../History/history";

const API_URL = "http://api.walnutia.ir";

export const employerCheckCode = createAsyncThunk(
    'user/employerCheckCode',
    async( {Phone, Code}, thunkAPI ) =>{
        try{
            const response = await axiosInstance.post(API_URL + "/Employer/CheckCode",{
                Phone,
                Code,
            });
            if (response.status === 200) {
                localStorage.setItem("token", response.data );
                console.log(response.data);
                history.push({ pathname: "/Profile-Employer" });
                return response;
            } 
            useDispatch(response);
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const workerCheckCode = createAsyncThunk(
    'user/workerCheckCode',
    async( {Phone, Code}, thunkAPI ) =>{
        try{
            const response = await axiosInstance.post(API_URL + "/Worker/CheckCode",{
                Phone,
                Code,
            });
            if (response.status === 200) {
                localStorage.setItem("token", response.data);
                history.push({ pathname: "/Profile-Worker" });
                return response;
            }
            useDispatch(response.data);
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }, 
)

export const userCheckCodeSlice = createSlice({
    name: 'userCheckCode',
    initialState: {
        Phone: "",
        Code: "",
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
        [employerCheckCode.fulfilled]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },
        [employerCheckCode.pending]: (state) => {
            state.isFetching = false;
        },
        [employerCheckCode.rejected]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
        },
        [workerCheckCode.fulfilled]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },
        [workerCheckCode.pending]: (state) => {
            state.isFetching = false;
        },
        [workerCheckCode.rejected]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
        },
    }
});

export const  {clearState}  = userCheckCodeSlice.actions;
export const userSelector = state => state.userCheckCode;
