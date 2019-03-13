import axios from '../libs/api.request'
// 列表获取
export const gethealthList = (ss) => {
  return axios.request({
    url:'/system/physicalManage',
    data:ss,
    method: 'post'
  })
};
// 添加信息
export const volunteeradd = (data) => {
  return axios.request({
    url:'/system/physicalManage/addOrUpdate',
    data:data,
    method: 'post'
  })
};
// 获取下拉框的人员姓名
export const getvolunteername = (data) => {
    return axios.request({
      url:'/system/physicalManage/findProjectPerson ',
      data:data,
      method: 'post'
    })
  };
// 获取入组管理列表
export const getenterList = (data) => {
  return axios.request({
    url:'/system/groupManage/inGroupPage',
    data:data,
    method: 'post'
  })
};
// 获取黑名单列表
export const getblackList = (data) => {
  return axios.request({
    url:'/system/blacllistManage',
    data:data,
    method: 'post'
  })
};
// 志愿者类型
// admin/system/data
export const zyzlist = (data) => {
  return axios.request({
    url:'/admin/system/data',
    data:data,
    method: 'post'
  })
};
// 标记为白名单 /system/blacllistManage/batchWhiteList
export const whiteList = (data) => {
  return axios.request({
    url:'/system/blacllistManage/batchWhiteList',
    data:data,
    method: 'post'
  })
};
// 志愿者查询 
export const volunteerSearch = (data) => {
  return axios.request({
    url:'/system/volunteerManage',
    data:data,
    method: 'post'
  })
};
