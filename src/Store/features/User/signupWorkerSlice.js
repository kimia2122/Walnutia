import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import axiosInstance from "../../../axios";
import history from "../../../History/history";

const API_URL = "http://api.walnutia.ir";

export const SignupWorker = createAsyncThunk(
    'user/SignupWorker',
    async ({ 
        Phone,
        FullName,
        NationalId,
        WorkerCareerIds,
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
              if (NationalId) {
                myData.append("NationalId", NationalId);
              } else {
                myData.append("NationalId", "");
              }
              if (WorkerCareerIds) {
                WorkerCareerIds.forEach((element) => {
                  myData.append("WorkerCareerIds", element);
                  console.log(element);
                });
              } else {
                myData.append("WorkerCareerIds", "");
              }
              if (Image) {
                myData.append("Image", Image);
              } else {
                myData.append("Image", "");
              }
            
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
                if(error.response.status === 404){
                  history.push({pathname: "/Signup-worker"})
                }
            }
            useDispatch({
                payload: {
                    massage: error.response,
                    type: "error"
                }
            })
            thunkAPI.rejectWithValue(error.response.myData);
        }  
    },
)

export const userSignupWorkerSlice = createSlice({
    name: 'userSignupWorker',
    initialState: {
        Phone: "",
        FullName: "",
        WorkerCareerIds: [],
        NationalId: "",
        Image: "",
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
        [SignupWorker.fulfilled]: (state) => {
          state.isFetching = false;
          state.isSuccess = true;
          return state;
        },
        [SignupWorker.pending]: (state) => {
            state.isFetching = true;
        },
        [SignupWorker.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        }
    }
})

export const  {clearState}  = userSignupWorkerSlice.actions;

//A "selector function" is any function that accepts the Redux store state
//(or part of the state) as an argument,and returns data that is based on that state.
export const userSelector = state => state.userSignupWorker;