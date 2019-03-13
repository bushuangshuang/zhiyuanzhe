import axios from '../libs/api.request'

//机构
export const hospitalList = data => {
    return axios.request({
        url: '/api/hospital',
        data: data,
        method: 'post'
    })
};
export const hospitalFindById = data => {
    return axios.request({
        url: '/api/hospital/findById',
        data: data,
        method: 'post'
    })
};
export const selectHospital = data => {
    return axios.request({
        url: '/api/hospital/selectHospital',
        data: data,
        method: 'post'
    })
};

//
export const medicineList = data => {
    return axios.request({
        url: '/api/medicine',
        data: data,
        method: 'post'
    })
};
//
export const medicineFindById = data => {
    return axios.request({
        url: '/api/medicineCompany/findById',
        data: data,
        method: 'post'
    })
};
export const projectList = data => {
    return axios.request({
        url: '/api/project',
        data: data,
        method: 'post'
    })
};
export const projectFindById = data => {
    return axios.request({
        url: '/api/project/findById',
        data: data,
        method: 'post'
    })
};
export const onlineApplication = data => {
    return axios.request({
        url: '/system/projectApply/onlineApplication',
        data: data,
        method: 'post'
    })
};

