import request from '@/utils/request'
// 查看当前课程是否被当前用户购买
export function checkOrder(params) {
  return request({
    url: '/checkOrder',
    method: 'get',
    params
  })
}

// 提交订单
export function submitOrder(data) {
  return request({
    url: '/submitOrder',
    method: 'post',
    data
  })
}

// 通过学生id获取订单列表
export function getOrderByStuId(params) {
  return request({
    url: '/getOrderByStuId',
    method: 'get',
    params
  })
}

// 删除订单
export function delOrder(data) {
  return request({
    url: "/delOrder",
    method: "post",
    data: { data }
  });
}
