import request from '@/utils/request'

export function getBricks(id) {
  return request({
    url: '/api/bricks?pid=' + id,
    method: 'get'
  })
}

export function getBrick(id) {
  return request({
    url: '/api/bricks/' + id,
    method: 'get'
  })
}

export function addBrick(data) {
  return request({
    url: '/api/bricks',
    method: 'post',
    data
  })
}

export function putBrick(id,data) {
  return request({
    url: '/api/bricks/'+id,
    method: 'put',
    data
  })
}

export function delBrick(id) {
  return request({
    url: '/api/bricks/' + id,
    method: 'delete'
  })
}
