import request from '@/utils/request'
// 获取boss的招募列表
export function getRecruit(params) {
  return request({
    url: '/boss/recruit',
    method: 'get',
    params
  })
}

// 审核boss
export function checkRecruit(params) {
    return request({
      url: '/checkRecruit',
      method: 'put',
      params
    })
  }
  
  // 删除boss
  export function delRecruit(data) {
    return request({
      url: '/delRecruit',
      method: 'put',
      data: { data }
    })
  }

// 更新招募信息
export function upDataRecruit(data) {
  console.log(JSON.stringify(data))
  return request({
    url: '/upDataRecruit',
    method: 'post',
    data: { data }
  })
}

// 获取应召列表
export function getRecruitList(params) {
  return request({
    url: '/getRecruitList',
    method: 'get',
    params
  })
}