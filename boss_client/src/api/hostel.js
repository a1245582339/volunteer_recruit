import request from '@/utils/request'
// 获取订单列表
export function getHostelList(params) {
  return request({
    url: "/boss/hostList",
    method: "get",
    params
  });
}
// 删除订单
export function delHostel(data) {
  return request({
    url: "/delHostel",
    method: "put",
    data: { data }
  });
}

// 修改青旅
export function updataHostel(data) {
  console.log('req>>' + JSON.stringify(data))
  return request({
    url: '/updataHostel',
    method: 'put',
    data: {data: JSON.stringify(data)}
  })
}
