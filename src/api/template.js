import request from '@/utils/request'

export function getTemplates(params) {
  return request({
    url: '/api/templates',
    method: 'get',
    params
  })
}

export function getTemplate(id) {
  return request({
    url: '/api/templates/' + id,
    method: 'get'
  })
}

export function addTemplate(data) {
  return request({
    url: '/api/templates',
    method: 'post',
    data
  })
}

export function putTemplate(id, data) {
  return request({
    url: '/api/templates/' + id,
    method: 'put',
    data
  })
}

export function delTemplate(id) {
  return request({
    url: '/api/templates/' + id,
    method: 'delete'
  })
}
