import axios from '../libs/api.request'


export const newsList = data => {
    return axios.request({
        url: '/api/news/physicalNews',
        data: data,
        method: 'post'
    })
};
export const newsAdd = data => {
    return axios.request({
        url: '/api/news/add',
        data: data,
        method: 'post'
    })
};
export const sendNews = data => {
    return axios.request({
        url: '/api/news/sendNews',
        data: data,
        method: 'post'
    })
};
export const findProjectSelect = data => {
    return axios.request({
        url: '/system/hospitalProject/findProjectSelect',
        data: data,
        method: 'post'
    })
};
export const volunteerList = data => {
    return axios.request({
        url: '/system/volunteerManage',
        data: data,
        method: 'post'
    })
};
