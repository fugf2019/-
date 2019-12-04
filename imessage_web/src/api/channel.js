import request from '@/utils/request'


export function getIndustryType(params = {}) {
  return request({
    url: `/wx_industry_type`,
    method: 'get',
    params: params
  })
}

export function getChannel(params = {}) {
  return request({
    url: `/channel`,
    method: 'get',
    params: params
  })
}

export function getChannelInfo(id) {
  return request({
    url: `/channel/${id}`,
    method: 'get',
  })
}


export function createChannel(data) {
  return request({
    url: '/channel',
    method: 'post',
    data
  })
}


export function deleteChannel(id) {
  return request({
    url: `/channel/${id}`,
    method: 'delete'
  })
}

export function updateChannel(id, data) {
  return request({
    url: `/channel/${id}`,
    method: 'patch',
    data
  })
}
