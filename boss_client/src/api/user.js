import request from '@/utils/request'
// 查询注册用户名是否存在
export function checkNameExist(params) {
  return request({
    url: '/bosscheckNameExist',
    method: 'get',
    params
  })
}
// 注册
export function register(data) {
  return request({
    url: '/bossregister',
    method: 'post',
    data
  })
}

// 登录
export function login(username, password) {
  return request({
    url: '/bosslogin',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 根据token拉取用户信息
export function getInfo(token) {
  return request({
    url: '/bossgetInfo',
    method: 'get',
    params: {token}
  })
}

export function logout() {
  return request({
    url: '/bossLogout',
    method: 'post'
  })
}

export function checkPassword(params) {
  return request({
    url: '/checkPassword',
    method: 'get',
    params
  })
}

export function updateBoss(data) {
  return request({
    url: '/updateBoss',
    method: 'put',
    data
  })
}

export function updatePassword (data) {
  return request({
    url: '/boss/updatePassword',
    method: 'put',
    data
  })
}