import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/task.slice";

const store = configureStore({
    reducer:{
        taskData: taskSlice,
    }
});

export default store;