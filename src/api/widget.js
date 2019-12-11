import request from '@/utils/request'

export function getWidgets(params) {
  return request({
    url: '/api/widgets',
    method: 'get',
    params
  })
}

export function getWidget(id) {
  return request({
    url: '/api/widgets/' + id,
    method: 'get'
  })
}

export function addWidget(data) {
  return request({
    url: '/api/widgets',
    method: 'post',
    data
  })
}

export function putWidget(id, data) {
  return request({
    url: '/api/widgets/' + id,
    method: 'put',
    data
  })
}

export function delWidget(id) {
  return request({
    url: '/api/widgets/' + id,
    method: 'delete'
  })
}
