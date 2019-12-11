import request from '@/utils/request'

export function getDfields(params) {
    return request({
        url: '/api/dfields',
        method: 'get',
        params
    })
}

export function getDfield(id) {
    return request({
        url: '/api/dfields/' + id,
        method: 'get'
    })
}

export function addDfield(data) {
    return request({
        url: '/api/dfields',
        method: 'post',
        data
    })
}

export function putDfield(id, data) {
    return request({
        url: '/api/dfields/' + id,
        method: 'put',
        data
    })
}

export function delDfield(id) {
    return request({
        url: '/api/dfields/' + id,
        method: 'delete'
    })
}
