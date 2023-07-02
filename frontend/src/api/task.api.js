import Api from "./api";

export const addTask = (taskName, description) => {

    return Api().post('/addTask', {
        taskName,
        description
    }).then(response => {
        if (response) {
            return response.data;
        }
    });
}

export const updateTask = (id, taskName, description) => {
    return Api().put('/editTask', {
        id, taskName, description
    }).then(response => {
        if (response) {
            return response.data;
        }
    });
}

export const deleteTask = (id) => {
    console.log('id for delete', id);
    return Api().delete(`/deleteTask/${id}`).then(response => {
        if (response) {
            return response.data;
        }
    });
}

export const completeTask = (id) => {
    return Api().put('/completeTask', {
        id: id,
    }).then(response => {
        if (response) {
            return response.data;
        }
    });
}

export const getAllTasks = () => {
    return Api().get('/getAllTasks').then(response => {
        if (response) {
            return response.data;
        }
    })
}