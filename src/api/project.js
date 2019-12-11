import request from '@/utils/request'

export function getProjects(params) {
    return request({
        url: '/api/projects',
        method: 'get',
        params
    })
}

export function getProject(id) {
    return request({
        url: '/api/projects/' + id,
        method: 'get'
    })
}

export function addProject(data) {
    return request({
        url: '/api/projects',
        method: 'post',
        data
    })
}

export function putProject(id, data) {
    return request({
        url: '/api/projects/' + id,
        method: 'put',
        data
    })
}

export function delProject(id) {
    return request({
        url: '/api/projects/' + id,
        method: 'delete'
    })
}
