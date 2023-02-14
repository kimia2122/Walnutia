import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import axiosInstance from "../../../../axios";
import history from "../../../../History/history";

const API_URL = "http://api.walnutia.ir";

export const AddAddressEmployer = createAsyncThunk(
    'user/AddAddressEmployer',
    async({ Address, lat, lng }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(API_URL + "/EmployerAddress/Add", {
                Address, lat, lng
            });
            if(res.status === 200) {
                history.push({ pathname: "/Profile-Employer" });
                return res;
            }
            useDispatch(res);
        } catch (error) {
            thunkAPI.rejectWithValue(error.res.data);
        }
    }
)

export const AddAddressSlice = createSlice({
    name: 'AddAddress',
    initialState: {
        Address: "",
        lat: "",
        lng: "",
        isFetching: false,
        isSuccess: false,
        isError: false
    },
    reducers: {
        clearReducer: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        }
    },
    extraReducers: {
        [AddAddressEmployer.fulfilled]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },
        [AddAddressEmployer.pending]: (state) => {
            state.isFetching = true;
        },
        [AddAddressEmployer.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        }
    }
})

export const { clearReducer } = AddAddressSlice.actions;
export const userSelector = state => state.AddAddress