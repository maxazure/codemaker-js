import request from '@/utils/request'

export function getGenerateCode(brickId, templateId) {
  return request(
    {
      url: `/api/generator/${brickId}?templateid=${templateId}`,
      method: 'get'
    }
  )
}

export function getGeneratorListRails() {
  return request({
    url: 'api/templates/generator-list-rails',
    method: 'get'
  })
}

export function getGeneratorListVue() {
  return request({
    url: 'api/templates/generator-list-vue',
    method: 'get'
  })
}

export function getGeneratorBatch(brickId, type) {
  return request({
    url: `api/generator/batch/${brickId}?t=${type}`,
    method: 'get'
  })
}
export function getGeneratorBatchDir(brickId, type) {
  return request({
    url: `api/generator/batch1/${brickId}?t=${type}`,
    method: 'get'
  })
}
