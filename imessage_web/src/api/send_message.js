import request from '@/utils/request'


export function sendMessage(data) {
  return request({
    url: '/message/send',
    method: 'post',
    data
  })
}


