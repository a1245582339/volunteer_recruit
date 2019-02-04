import request from '@/utils/request'
// 获取旅社
export function getHostelList(params) {
  return request({
    url: "/hostList",
    method: "get",
    params
  });
}

