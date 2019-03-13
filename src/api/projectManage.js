import axios from '../libs/api.request'

//药厂、cro
export const listProject = data => {
    return axios.request({
        url: '/system/medicineProject',
        data: data,
        method: 'post'
    })
};
export const addProject = data => {
    return axios.request({
        url: '/system/medicineProject/add',
        data: data,
        method: 'post'
    })
};
export const updateProject = data => {
    return axios.request({
        url: '/system/medicineProject/update',
        data: data,
        method: 'post'
    })
};
export const deleteByIdProject = data => {
    return axios.request({
        url: '/system/medicineProject/deleteById',
        data: data,
        method: 'post'
    })
};
export const sendProject = data => {
    return axios.request({
        url: '/system/medicineProject/sendProject',
        data: data,
        method: 'post'
    })
};
//医疗机构
export const hospitalProjectList = data => {
    return axios.request({
        url: '/system/hospitalProject',
        data: data,
        method: 'post'
    })
};
export const hospitalProjectAdd = data => {
    return axios.request({
        url: '/system/hospitalProject/add',
        data: data,
        method: 'post'
    })
};
export const hospitalProjectUpdate = data => {
    return axios.request({
        url: '/system/hospitalProject/update',
        data: data,
        method: 'post'
    })
};
export const hospitalProjectDeleteById = data => {
    return axios.request({
        url: '/system/hospitalProject/deleteById',
        data: data,
        method: 'post'
    })
};
export const hospitalProjectFindById = data => {
    return axios.request({
        url: '/system/hospitalProject/findById',
        data: data,
        method: 'post'
    })
};
export const queryHospitalProject = data => {
    return axios.request({
        url: '/system/hospitalProject/queryHospitalProject',
        data: data,
        method: 'post'
    })
};
export const publishHospitalProject = data => {
    return axios.request({
        url: '/system/hospitalProject/publishHospitalProject',
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
export const agreeHospitalProject = data => {
    return axios.request({
        url: '/system/hospitalProject/agreeHospitalProject',
        data: data,
        method: 'post'
    })
};
export const submitHospitalProject = data => {
    return axios.request({
        url: '/system/hospitalProject/submitHospitalProject',
        data: data,
        method: 'post'
    })
};
//合作机构
export const medicineCooperative = data => {
    return axios.request({
        url: '/system/medicineCooperative',
        data: data,
        method: 'post'
    })
};
export const medicinePublishList = data => {
    return axios.request({
        url: '/system/medicinePublish',
        data: data,
        method: 'post'
    })
};
export const medicinePublishAdd = data => {
    return axios.request({
        url: '/system/medicinePublish/add',
        data: data,
        method: 'post'
    })
};
export const publishProject = data => {
    return axios.request({
        url: '/system/medicinePublish/publishProject',
        data: data,
        method: 'post'
    })
};


