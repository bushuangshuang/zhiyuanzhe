import axios from '../libs/api.request'
export const resList = data => {
    return axios.request({
        url: '/admin/system/res',
        data: data,
        method: 'post'
    })
};
export const resSave = data => {
    return axios.request({
        url: '/admin/system/res/save',
        data: data,
        method: 'post'
    })
};
export const resEnable = data => {
    return axios.request({
        url: '/admin/system/res/enable',
        data: data,
        method: 'post'
    })
};
export const resUpdate = data => {
    return axios.request({
        url: '/admin/system/res/update',
        data: data,
        method: 'post'
    })
};
export const resRemove = data => {
    return axios.request({
        url: '/admin/system/res/remove',
        data: data,
        method: 'post'
    })
};
export const resStop = data => {
    return axios.request({
        url: '/admin/system/res/stop',
        data: data,
        method: 'post'
    })
};
