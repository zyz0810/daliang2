import {request} from './ApiConfig'

const AdminServer = {
  // 登录
  Login (params) {
    return request({
      method: 'Post',
      url: '/external/login',
      params: params
    })
  },
  userPassword (params) {
    return request({
      method: 'Put',
      url: '/users/userPassword',
      params: params
    })
  },
  getTaskOrderListByOrderContract (params) {
    return request({
      method: 'Get',
      url: '/company/getTaskOrderListByOrderContract',
      params: params
    })
  },
  getTaskOrderList (params) {
    return request({
      method: 'Get',
      url: '/company/getTaskOrderList',
      params: params
    })
  },
  getGrain (params) {
    return request({
      method: 'Get',
      url: '/dljy/getGrain',
      params: params
    })
  },
  getMyDepartUser (params) {
    return request({
      method: 'Get',
      url: '/depart/getMyDepartUser',
      params: params
    })
  },
  addTaskOrder (params) {
    return request({
      method: 'Post',
      url: '/company/addTaskOrder',
      params: params
    })
  },
  getTaskOrderByOrderContract (params) {
    return request({
      method: 'Get',
      url: '/company/getTaskOrderByOrderContract',
      params: params
    })
  },
  getTaskOrder (params) {
    return request({
      method: 'Get',
      url: '/company/getTaskOrder',
      params: params
    })
  },
  getOutCarList (params) {
    return request({
      method: 'Get',
      url: '/dljy/getOutCarList',
      params: params
    })
  },
  getUserAgentList (params) {
    return request({
      method: 'Get',
      url: '/depart/getUserAgentList',
      params: params
    })
  },
  getAllDepartUser (params) {
    return request({
      method: 'Get',
      url: '/depart/getAllDepartUser',
      params: params
    })
  },
  addDepartTaskOrder (params) {
    return request({
      method: 'Post',
      url: '/depart/addDepartTaskOrder',
      params: params
    })
  },
  cancelTaskOrder (params) {
    return request({
      method: 'Post',
      url: '/company/cancelTaskOrder',
      params: params
    })
  },
  confirmCompletion (params) {
    return request({
      method: 'Post',
      url: '/depart/confirmCompletion',
      params: params
    })
  },
  getMyForwardTaskByOrderContract (params) {
    return request({
      method: 'Get',
      url: '/depart/getMyForwardTaskByOrderContract',
      params: params
    })
  },
  getMyForwardTask (params) {
    return request({
      method: 'Get',
      url: '/depart/getMyForwardTask',
      params: params
    })
  },
  getMyComUser (params) {
    return request({
      method: 'Get',
      url: '/depart/getMyComUser',
      params: params
    })
  },
  getUserAgent (params) {
    return request({
      method: 'Get',
      url: '/depart/getUserAgent',
      params: params
    })
  },
  addUserAgent (params) {
    return request({
      method: 'Post',
      url: '/depart/addUserAgent',
      params: params
    })
  },
  delUserAgent (params) {
    return request({
      method: 'Post',
      url: '/depart/delUserAgent',
      params: params
    })
  },
  getAllTaskResultByUserId (params) {
    return request({
      method: 'Get',
      url: '/company/getAllTaskResultByUserId',
      params: params
    })
  },
  getTreeDiagram (params) {
    return request({
      method: 'Get',
      url: '/company/getTreeDiagram',
      params: params
    })
  },
  getTreeDiagramShanxing (params) {
    return request({
      method: 'Get',
      url: '/company/getTreeDiagramShanxing',
      params: params
    })
  },
   getLineChart (params) {
    return request({
      method: 'Get',
      url: '/company/getLineChart',
      params: params
    })
  },
   getAllTaskResultRealByUserId (params) {
    return request({
      method: 'Get',
      url: '/company/getAllTaskResultRealByUserId',
      params: params
    })
  },
  getTreehide (params) {
    return request({
      method: 'Post',
      url: '/company/hide',
      params: params
    })
  },
  downloadFile (params) {
    return request({
      method: 'Liu',
      url: '/download',
      params: params
    })
  },
}
export default AdminServer
