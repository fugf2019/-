import request from '@/utils/request'

export function getRecipient(params = {}) {
  return request({
    url: `/recipient`,
    method: 'get',
    params: params
  })
}

export function getRecipients(params = {}) {
  return request({
    url: `/recipient`,
    method: 'get',
    params: params
  })
}

export function getRecipientInfo(uid) {
  return request({
    url: `/recipient/${uid}`,
    method: 'get',
  })
}


export function createRecipient(data) {
  return request({
    url: '/recipient',
    method: 'post',
    data
  })
}


export function deleteRecipientInfo(id) {
  return request({
    url: `/recipient/${id}`,
    method: 'delete'
  })
}

export function updateRecipient(id, data) {
  return request({
    url: `/recipient/${id}`,
    method: 'patch',
    data
  })
}
