import Axios  from "axios";


export const api = Axios.create({
    baseURL: process.env.ApiBase,
})