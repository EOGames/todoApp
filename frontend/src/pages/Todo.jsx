import React, { useEffect, useState } from 'react'
import { InputLabel, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import './todo.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as TaskApi from '../api/task.api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskList } from '../store/slices/task.slice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '10px solid #ccc',
    boxShadow: 24,
    height: 400,
    p: 4,
};

const headingStyle = {
    color: 'white',
    fontSize: '1rem',
    fontWeight: '900',
    textShadow: '1px 1px 5px black',
    textAlign: 'center',
}

const evenRow = {
    backgroundColor: '#c9c9c9',
}

const oddRow = {
    backgroundColor: 'darkgrey',
}

const centerText = {
    textAlign: 'center',
}


function Todo() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const taskList = useSelector((state) => state.taskData.tasks);
    const [saveButtonStat, setSaveButtonStat] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editTaskId,setEditTaskId] = useState('');

    const showErrorInAddTask = (isError, msg) => {
        const newTaskError = document.getElementById('newTaskError');
        if (isError) {
            newTaskError.style = `color:red`;
            newTaskError.innerHTML = msg;
        } else {
            newTaskError.style = `color:green`;
            newTaskError.innerHTML = msg;
        }
    }
    const handleAddTask = async () => {
        setSaveButtonStat(true);
        try {
            showErrorInAddTask(false, `Saving....`);
            let response = await TaskApi.addTask(taskName, description);
            if (response.status) {
                showErrorInAddTask(false, `Done !`);
                response = response.data;
                console.log('response', response);
                showErrorInAddTask(false, '');
                dispatch(fetchTaskList());

                setTimeout(() => {

                    handleClose();
                    setSaveButtonStat(false);
                }, 1200);

            }
            else {
                console.log('task response Is None');
                setSaveButtonStat(false);
            }

        } catch (error) {
            console.log('error', error);
            showErrorInAddTask(true, error.response.data.message);
            setSaveButtonStat(false);

        }
    }


    const handleUpdateTask = async () => {
        setSaveButtonStat(true);
        try {
            showErrorInAddTask(false, `Updating....`);
            let response = await TaskApi.updateTask(editTaskId,taskName,description);
            if (response.status) {
                showErrorInAddTask(false, `Done !`);
                response = response.data;
                console.log('response', response);
                showErrorInAddTask(false, '');
                dispatch(fetchTaskList());

                setTimeout(() => {

                    handleClose();
                    setSaveButtonStat(false);
                }, 1200);

            }
            else {
                console.log('task response Is None');
                setSaveButtonStat(false);
            }

        } catch (error) {
            console.log('error', error);
            showErrorInAddTask(true, error.response.data.message);
            setSaveButtonStat(false);

        }
    }


    useEffect(() => {
        dispatch(fetchTaskList());
        // fetchTask();
    }, [dispatch]);

    const editTask = (id) => {
        setEditTaskId(id);
        openModal('editTask');
        const selectedTask = findSelectedList(id);
        setTaskName(selectedTask.taskName);
        setDescription(selectedTask.description);
    }

    const findSelectedList =(id) =>
    {
        for (let i = 0; i < taskList.length; i++) {
            const element = taskList[i];
            if (element._id === id)
            {
                return element;
            }            
        }
    }

    const deleteTask = async(taskId) => {
        const response = await TaskApi.deleteTask(taskId);
        console.log('delete response ',response);
        dispatch(fetchTaskList());
    }

    const completeTask = async (id) => {
        const response = await TaskApi.completeTask(id);
        // console.log('completed task',response);
        dispatch(fetchTaskList());
    }

    const openModal = (calledFrom) => {
        setModalType(calledFrom);
        handleOpen();
    }

    return (
        <>
            <div>
                <Button sx={{ backgroundColor: 'grey', float: 'right', margin: '1% 5%' }} variant="contained" onClick={() => openModal('addTask')}>Add Task</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {
                            modalType === 'addTask' ?
                                <>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                                        Add New Task
                                    </Typography>
                                    <InputLabel sx={{ margin: '.5rem 0' }}>Task</InputLabel>
                                    <TextField onChange={(e) => setTaskName(e.target.value)} sx={{ width: '100%' }} id="outlined-basic" variant="outlined" placeholder='Enter Task / Git Branch Name' />

                                    <InputLabel sx={{ margin: '.5rem 0' }}>Description</InputLabel>
                                    <TextField onChange={(e) => setDescription(e.target.value)} multiline rows={3} sx={{ width: '100%' }} id="outlined-basic" placeholder='Enter Task / Git Branch Name' />
                                    <Button disabled={saveButtonStat} onClick={handleAddTask} sx={{ backgroundColor: 'grey', width: '100px', margin: '5% 50%', transform: 'translate(-50%,-0%)', }} variant="contained">{saveButtonStat ? 'Saving...' : 'Save'}</Button>
                                    <span id='newTaskError'></span>
                                </>

                                :
                                <>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                                       Edit Task
                                    </Typography>
                                    <InputLabel sx={{ margin: '.5rem 0' }}>Task</InputLabel>
                                    <TextField value={taskName} onChange={(e) => setTaskName(e.target.value)} sx={{ width: '100%' }} id="outlined-basic" variant="outlined" placeholder='Enter Task / Git Branch Name' />

                                    <InputLabel sx={{ margin: '.5rem 0' }}>Description</InputLabel>
                                    <TextField value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} sx={{ width: '100%' }} id="outlined-basic" placeholder='Enter Task / Git Branch Name' />
                                    <Button disabled={saveButtonStat} onClick={handleUpdateTask} sx={{ backgroundColor: 'grey', width: '100px', margin: '5% 50%', transform: 'translate(-50%,-0%)', }} variant="contained">{saveButtonStat ? 'Updating...' : 'Update'}</Button>
                                    <span id='newTaskError'></span>
                                </>
                        }

                    </Box>
                </Modal>
            </div>
            <div className='tablePosFixer'>

                <div className='table_holder'>
                    <Table>
                        <TableHead style={{ backgroundColor: 'grey' }}>
                            <TableRow>
                                <TableCell sx={headingStyle}>Id</TableCell>
                                <TableCell sx={headingStyle}>TaskName</TableCell>
                                <TableCell sx={headingStyle}>Description</TableCell>
                                <TableCell sx={headingStyle}>Status</TableCell>
                                <TableCell sx={headingStyle}>Start Time</TableCell>
                                <TableCell sx={headingStyle}>Completion Time</TableCell>
                                <TableCell sx={headingStyle}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                taskList.length > 0 ?
                                    <>
                                        {
                                            taskList.map((t, index) =>
                                                <TableRow className={t.completed ? 'done' : ''} id={`task_row${index}`} key={`task_row${index}`} style={index % 2 === 0 ? evenRow : oddRow}>
                                                    <TableCell sx={centerText} >{index}</TableCell>
                                                    <TableCell sx={centerText}>{t.taskName}</TableCell>
                                                    <TableCell style={{ overflow: 'auto', wordWrap: 'break-word', maxWidth: '250px' }} sx={centerText}>{t.description}</TableCell>
                                                    <TableCell sx={centerText}>{t.completed ? 'Completed' : 'Pending'}</TableCell>
                                                    <TableCell style={{ width: 'fit-content' }} >{t.startTime}</TableCell>
                                                    <TableCell style={{ width: 'fit-content' }} >{t.completionTime}</TableCell>

                                                    <TableCell style={{ width: 'fit-content', textAlign: 'center' }} >
                                                        <Button onClick={()=> editTask(t._id)} sx={{ backgroundColor: '#ad8b10', fontSize: '1rem', margin: '.1rem .1rem' }} variant="contained"><i className="bi bi-pencil-square"></i></Button>
                                                        <Button onClick={()=> deleteTask(t._id)} sx={{ backgroundColor: '#881818', fontSize: '1rem', margin: '.1rem .1rem' }} variant="contained"><i className="bi bi-trash3"></i></Button>
                                                        <Button disabled={t.completed} onClick={() => completeTask(t._id)} sx={{ backgroundColor: '#338016', fontSize: '1rem', margin: '.1rem .1rem' }} variant="contained"><i className="bi bi-check-circle"></i></Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </>

                                    :
                                    <>
                                        <TableRow >
                                            <TableCell colSpan={7} sx={{ textAlign: 'center', width: '100%', fontSize: '1.5rem' }}>No Task Found Add One</TableCell>
                                        </TableRow>
                                    </>
                            }
                        </TableBody>
                    </Table>
                </div>

            </div>

        </>

    );
}

export default Todo;