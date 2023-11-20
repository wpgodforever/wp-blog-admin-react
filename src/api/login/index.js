import request from '../http/$http'

// 查询用户详细
// export function getUser(userId) {
//     return request({
//       url: '/cp/bus/system/user/' + praseStrEmpty(userId),
//       method: 'get',
//     })
//   }

// 登录
export function loginFn(data) {
  return request({
    url: '/user/login',
    method: 'get',
    params: data,
  })
}