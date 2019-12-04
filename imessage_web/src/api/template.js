import request from '@/utils/request'

export function getTemplate(params = {}) {
  return request({
    url: `/template`,
    method: 'get',
    params: params
  })
}

export function getTemplateInfo(uid) {
  return request({
    url: `/template/${uid}`,
    method: 'get',
  })
}


export function createTemplate(data) {
  return request({
    url: '/template',
    method: 'post',
    data
  })
}


export function deleteTemplateInfo(id) {
  return request({
    url: `/template/${id}`,
    method: 'delete'
  })
}

export function updateTemplate(id, data) {
  return request({
    url: `/template/${id}`,
    method: 'patch',
    data
  })
}
