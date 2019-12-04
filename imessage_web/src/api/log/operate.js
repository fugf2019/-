import request from '@/utils/request'


export function getOperateLog({argsQuery = {}, pageQuery = {}} = {}, embedded = {}, sorts = '') {
  return request({
    url: `/op_log?where=${JSON.stringify(argsQuery)}&embedded=${JSON.stringify(embedded)}&sort=${sorts}`,
    method: 'get',
    params: pageQuery
  })
}

export function getOperateLogInfo(uid) {
  return request({
    url: `/op_log/${uid}`,
    method: 'get',
  })
}


export function createOperateLog(data) {
  return request({
    url: '/op_log',
    method: 'post',
    data
  })
}


export function deleteOperateLog(uid) {
  return request({
    url: '/op_log/' + uid,
    method: 'delete'
  })
}

export function deleteOperateLogs(params = {}) {
  return request({
    url: `/op_log?where=${JSON.stringify(params)}`,
    method: 'delete',
  })
}

export function updateOperateLog(uid, data) {
  return request({
    url: `/op_log/${uid}`,
    method: 'patch',
    data
  })
}

