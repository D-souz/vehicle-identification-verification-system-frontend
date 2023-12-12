import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

// initial enrollee state
const initialState = {
  enrollees: [],
  isError :false,
  isLoading :false,
  isSuccess :false,
  message :"",
  enrollee: []
}

// // ROUTES API
const API_URL = "http://localhost:3000";

// Save enrollee data into the DB
export const registerEnrollee =  createAsyncThunk(
  "enrollee/registration",
  async ({
    name,
    email,
    telephone,
    address,
    nin,
    vin,
    numberPlate,
    model,
    picture },
     thunkAPI) => {
    try {
      const response = await axios.post(API_URL + "/api/enrollee/register", {
        name,
        email,
        telephone,
        address,
        nin,
        vin,
        numberPlate,
        model,
        picture
    }, 
    {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    console.log(response.data);

    if (response.data) {
      toast.success("Enrollee registered successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Enrollee registration failed!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    } catch (error) {
      console.log(error);

       // capturing the error message from the server
       const message = (error.response && error.response.data && error.response.data.message ) ||
       error.message || error.toString();

       return thunkAPI.rejectWithValue(message);
    }
  }
);

// fetching enrollees from db
export const getEnrollees = createAsyncThunk(
  "fetch/enrollees",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL + "/api/enrollee/enrollees")
      // console.log(response.data);
      return response.data;

  } catch (error) {
      console.log(error);
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
    return thunkAPI.rejectWithValue(message);
  }
  }
);
// getting a single enrollee
export const getSingleEnrollee = createAsyncThunk(
  "enrollees/getSingleEnrollee",
  async (id, thunkAPI) =>{

      try {
          const response = await axios.get(API_URL + `/api/enrollee/${id}`)

          if (!response.data) {
              toast.error("No such Enrollee found with that id!", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
          }
          // console.log(response.data);
          return response.data;

      } catch (error) {
          console.log(error);
          const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
      }
  }
);
export const EnrolleeSlice = createSlice({
  name: "enrollees",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ""
  }
  },
  extraReducers: (builder) => {
    builder
    .addCase(registerEnrollee.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerEnrollee.fulfilled, (state, action) =>{
      state.isSuccess = true;
      state.isLoading = false;
      state.enrollee = action.payload;
    })
    .addCase(registerEnrollee.rejected, (state, action) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
    .addCase(getEnrollees.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getEnrollees.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.enrollees = action.payload;
    })
    .addCase(getEnrollees.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })
    .addCase(getSingleEnrollee.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getSingleEnrollee.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.enrollee = action.payload;
    })
    .addCase(getSingleEnrollee.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })
  }
});

export const { reset } = EnrolleeSlice.actions;
export default EnrolleeSlice.reducer;
