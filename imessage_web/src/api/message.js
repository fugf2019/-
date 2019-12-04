import request from '@/utils/request'

export function getMessage(params = {}) {
  return request({
    url: `/message`,
    method: 'get',
    params: params
  })
}

export function getMessageInfo(uid) {
  return request({
    url: `/message/${uid}`,
    method: 'get',
  })
}


export function createMessage(data) {
  return request({
    url: '/message',
    method: 'post',
    data
  })
}


export function deleteMessageInfo(id) {
  return request({
    url: `/message/${id}`,
    method: 'delete'
  })
}
