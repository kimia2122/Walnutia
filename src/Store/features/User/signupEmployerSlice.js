import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import axiosInstance from "../../../axios";
import history from "../../../History/history";

const API_URL = "http://api.walnutia.ir";

export const SignupEmployer = createAsyncThunk(
    'user/SignupEmployer',
    async ({ 
        Phone,
        FullName,
        Address,
        Lat,
        Long,
        Image
        }, thunkAPI ) => {
        try {
            const myData = new FormData();
            localStorage.setItem("PhoneNumber", Phone);
            myData.append("Phone", Phone);
            
            if (FullName) {
                myData.append("FullName", FullName);
              } else {
                myData.append("FullName", "");
              }
              if (Address) {
                myData.append("Address", Address);
              } else {
                myData.append("Address", "");
              }
              if (Lat) {
                myData.append("Lat", Lat);
                console.log(Lat);
              } else {
                myData.append("Lat", "");
              }
              if (Long) {
                myData.append("Long", Long);
              } else {
                myData.append("Long", "");
              }
              if (Image) {
                myData.append("Image", Image);
              } else {
                myData.append("Image", "");
              }
           
                const response = await axiosInstance.post(
                    API_URL + "/Employer/Login", myData
                )
                console.log(response);
                console.log(myData);
                if (response.status === 200) {
                    history.push({ pathname: "/Profile-Employer" });
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
                } thunkAPI.rejectWithValue(error.response.myData);
            
            }  
    },
)

export const userSignupEmployerSlice = createSlice({
    name: 'userSignupEmployer',
    initialState: {
        Phone: "",
        FullName: "",
        Address: "",
        Lat: "",
        Long: "",
        Image: "",
        isFetching: false,
        isSuccess: false,
        isError: false
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
        [SignupEmployer.fulfilled]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },
        [SignupEmployer.pending]: (state) => {
            state.isFetching = true;
        },
        [SignupEmployer.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        }
    }
})

export const  {clearState}  = userSignupEmployerSlice.actions;

//A "selector function" is any function that accepts the Redux store state
//(or part of the state) as an argument,and returns data that is based on that state.
export const userSelector = state => state.userSignupEmployer;