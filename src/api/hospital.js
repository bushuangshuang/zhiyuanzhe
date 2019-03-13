import axios from '../libs/api.request'


export const hospitalList = data => {
    return axios.request({
        url: '/api/hospital',
        data: data,
        method: 'post'
    })
};
export const hospitalProjectList = data => {
    return axios.request({
        url: '/system/hospitalProject',
        data: data,
        method: 'post'
    })
};
export const agreeHospitalProject = data => {
    return axios.request({
        url: '/system/hospitalProject/agreeHospitalProject',
        data: data,
        method: 'post'
    })
};
export const disagreeHospitalProject = data => {
    return axios.request({
        url: '/system/hospitalProject/disagreeHospitalProject',
        data: data,
        method: 'post'
    })
};





