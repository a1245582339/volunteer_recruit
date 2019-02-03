import request from '@/utils/request'
//验证当前密码
export function checkCurrentPassApi(params) {
  return request({
    url: '/checkCurrentPassApi',
    method: 'get',
    params
  })
}

// 更改学生密码
export function updatePassword(data) {
  return request({
    url: '/updatePassword',
    method: 'post',
    data
  })
}

// 更改学生头像
export function updateAvatar(data) {
  return request({
    url: '/updateAvatar',
    method: 'post',
    data
  })
}

// 更改学生手机号
export function updateTel(data) {
  return request({
    url: '/updateTel',
    method: 'post',
    data
  })
}
