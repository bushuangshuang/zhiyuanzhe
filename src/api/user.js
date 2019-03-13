import axios from '../libs/api.request'
// 切换语言  语言(1中文、2英文)
export const changeLanguage = (par) => {
  const data = {
    language: par
  };
  return axios.request({
    url: '/admin/common/changeLanguage',
    data,
    method: 'post'
  })
};
export const login = (loginParam) => {
  const data = {
    loginName: loginParam.userName,
    password: loginParam.password
  };
  return axios.request({
    url: '/admin/login/doLogin',
    data,
    method: 'post'
  })
};
// 后台获取用户信息
export const getUserInfo = () => {
  return axios.request({
    url: '/admin/login/getInfo',
    method: 'post'
  })
};

export const logout = (token) => {
  return axios.request({
    url: '/admin/login/logout',
    method: 'post'
  })
};
export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
};

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
};

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
};

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
};

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
};
