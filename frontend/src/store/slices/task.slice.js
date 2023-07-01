import{createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as TaskApi from '../../api/task.api';

export const fetchTaskList = createAsyncThunk('/api/getAllTasks',async(pageNum,limit)=>
{
    try {
        const data = await TaskApi.getAllTasks();
        if (data.data) {
            console.log('data', data);
             return data;
            // addTask(data.data);
        }
    } catch (error) {
        console.log('error while fetching tasks',error);
    }
});

const taskSlice = createSlice({
    name:'task',
    initialState:{
        tasks : [],
        isLoading:true,
        errorMessage: '',
    },
    reducers:{
        // addTask(state,action)
        // {
        //     for (let i = 0; i < action.payload.length; i++) 
        //     {
        //         const element = action.payload[i];
        //         state.push(element);
                
        //     }
        // },

        // getTask(state,action)
        // {
        //     return state;
        // },
    },
    extraReducers: (builder) =>
    {
        // pending
        builder.addCase(fetchTaskList.pending,(state)=>
        {
            state.isLoading = true;
            state.errorMessage = '';
        });

        //fullfield
        builder.addCase(fetchTaskList.fulfilled,(state,action)=>
        {
            state.isLoading = false;
            state.errorMessage = '';
            console.log(action.payload);
            state.tasks = action.payload?.data;
            
        });

        builder.addCase(fetchTaskList.rejected,(state,action)=>
        {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        });
    }
});

export const {addTask,getTask} = taskSlice.actions;

export default taskSlice.reducer;