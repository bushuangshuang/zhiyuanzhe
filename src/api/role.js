import axios from '../libs/api.request'

export const roleList = data => {
    return axios.request({
        url: '/admin/system/role',
        data: data,
        method: 'post'
    })
};
export const roleSave = data => {
    return axios.request({
        url: '/admin/system/role/save',
        data: data,
        method: 'post'
    })
};
export const roleMenuTree = data => {
    return axios.request({
        url: '/admin/system/role/getMenuTree',
        data: data,
        method: 'post'
    })
};
export const roleUpdate = data => {
    return axios.request({
        url: '/admin/system/role/update',
        data: data,
        method: 'post'
    })
};
export const roleRemove = data => {
    return axios.request({
        url: '/admin/system/role/remove',
        data: data,
        method: 'post'
    })
};
export const roleExportFile = data => {
    return axios.request({
        url: '/admin/system/role/exportFile',
        data: data,
        method: 'post'
    })
};
export const roleGetMenuList = data => {
    return axios.request({
        url: '/admin/system/role/getMenuList',
        data: data,
        method: 'post'
    })
};

