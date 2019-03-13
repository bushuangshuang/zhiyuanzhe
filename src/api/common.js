import axios from '../libs/api.request'


export const upLoadFile = data => {
    return axios.request({
        url: '/admin/common/upload',
        data: data,
        method: 'post',
        headers: {
            'Content-Type':'multipart/form-data'
        }
    })
}
export const downloadFile = data => {
    return axios.request({
        url: '/admin/common/download',
        data: data,
        method: 'post'
    })
}
export const showImg = data => {
    return axios.request({
        url: '/admin/common/showImg',
        data: data,
        method: 'post'
    })
};
export const getSelectValueDesc = data => {
    return axios.request({
        url: '/admin/common/getSelectValueDesc',
        data: data,
        method: 'post'
    })
};
export const getValueByKeyOfType = data => {
    return axios.request({
        url: '/admin/common/getValueByKeyOfType',
        data: data,
        method: 'post'
    })
};
export const hospitalCompanyAdd = data => {
    return axios.request({
        url: 'api/hospital/add',
        data: data,
        method: 'post'
    })
};
export const medicineCompanyAdd = data => {
    return axios.request({
        url: 'api/medicine/add',
        data: data,
        method: 'post'
    })
};
export const registerPerAdd = data => {
    return axios.request({
        url: '/api/volunteer/add',
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
export const getSelectAreaPC = data => {
    return axios.request({
        url: '/admin/areaDict/getSelectAreaPC',
        data: data,
        method: 'post'
    })
};
export const getSelectAreaPY = data => {
    return axios.request({
        url: '/admin/areaDict/getSelectAreaPY',
        data: data,
        method: 'post'
    })
};
export const getSelectAreaCY = data => {
    return axios.request({
        url: '/admin/areaDict/getSelectAreaCY',
        data: data,
        method: 'post'
    })
};
// 医疗机构项目名称下拉框 
export const hospitalSelect = data => {
    return axios.request({
        url: '/system/hospitalProject/findProjectSelect',
        data: data,
        method: 'post'
    })
};
// 入组管理
export const enterlist = data => {
    return axios.request({
        url: '/system/groupManage/inGroupPage',
        data: data,
        method: 'post'
    })
};
// 黑名单
export const blacklist = data => {
    return axios.request({
        url: '/system/physicalManage/batchBlacklist',
        data: data,
        method: 'post'
    })
};
