import request from '@/utils/request'


export function getMessageLog(params = {}) {
  return request({
    url: `/message_log`,
    method: 'get',
    params: params
  })
}

export function getMessageLogInfo(uid) {
  return request({
    url: `/message_log/${uid}`,
    method: 'get',
  })
}


export function createMessageLog(data) {
  return request({
    url: '/message_log',
    method: 'post',
    data
  })
}


export function deleteMessageLog(uid) {
  return request({
    url: '/message_log/' + uid,
    method: 'delete'
  })
}


export function updateMessageLog(uid, data) {
  return request({
    url: `/message_log/${uid}`,
    method: 'patch',
    data
  })
}

