import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import axiosInstance from "../../../../axios";

const API_URL = "http://api.walnutia.ir";

export const GetAddressEmployer = createAsyncThunk(
    'user/GetAddressEmployer',
    async( { Address }, thunkAPI ) => {
        try{
            const res = await axiosInstance.get(API_URL + "/EmployerAddress/GetAddresses", {
                Address
            });
            if (res.status === 200) {
                return res;
            }
            useDispatch(res);
            console.log(res.data)
        }catch (error) {
            thunkAPI.rejectWithValue(error.res.data);
        }
    }
)

export const GetAddressSlice = createSlice({
    name: 'GetAddress',
    initialState: {
        Address: [],
        isFetching: false,
        isSuccess: false,
        isError: false,
    },
    reducers: {
        clearReducer: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        }
    }
})

export const { clearReducer } = GetAddressSlice.actions;
export const userSelector = state => state.GetAddress