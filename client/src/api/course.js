import request from '@/utils/request'
// 获取banner
export function getIndexCourse(params) {
  return request({
    url: '/getIndexCourse',
    method: 'get',
    params
  })
}
// 获取课程列表
export function getCourse(params) {
  return request({
    url: '/courseList',
    method: 'get',
    params
  })
}

// 根据课程类型id获取课程
export function getCourseByclass(params) {
  return request({
    url: '/getCourseByclass',
    method: 'get',
    params
  })
}

// 根据课程id获取课程
export function getCourseById(params) {
  return request({
    url: '/getCourseById',
    method: 'get',
    params
  })
}