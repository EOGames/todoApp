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