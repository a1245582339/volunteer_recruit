import request from "@/utils/request";
// 获取订单列表
export function getOrderList(params) {
  return request({
    url: "/orderList",
    method: "get",
    params
  });
}
// 删除订单
export function delOrder(data) {
  return request({
    url: "/delOrder",
    method: "post",
    data: { data }
  });
}
