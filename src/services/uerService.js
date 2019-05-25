import Vue from 'vue'
import api from '@/api'
// 登录接口
export const login = (reqData) => {
  return Vue.$axiosPosting(api.login, {
    SignName: reqData.username,
    SignPassword: reqData.password
  })
}
