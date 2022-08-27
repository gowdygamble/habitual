import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    habits: [],
    date: '',
};

const todaySlice = createSlice({
    name: 'today',
    initialState,
});

//console.log(todaySlice);

export default todaySlice.reducer;