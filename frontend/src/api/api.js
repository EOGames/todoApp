import axios from 'axios';
const backEndUrl = process.env.REACT_APP_BACKEND_URL;

const Api = ()=>
{
    return axios.create({
        baseURL : `${backEndUrl}/api`,
    });
}
export default Api;