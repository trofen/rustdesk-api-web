import request from '@/utils/request'

export function list (params) {
  return request({
    url: '/address_book_rule/list',
    params,
  })
}

export function detail (id) {
  return request({
    url: `/address_book_rule/detail/${id}`,
  })
}

export function create (data) {
  return request({
    url: '/address_book_rule/create',
    method: 'post',
    data,
  })
}

export function update (data) {
  return request({
    url: '/address_book_rule/update',
    method: 'post',
    data,
  })
}

export function remove (data) {
  return request({
    url: '/address_book_rule/delete',
    method: 'post',
    data,
  })
}
