import axios from 'axios'
import { Toast } from 'mint-ui'
import qs from 'qs'

const http = axios.create({
  timeout: 10000,
  responseType: 'json'
})

http.defaults.headers.common['platform'] ='H5'
http.defaults.headers.common['appVersion'] ='V2.5'
http.defaults.headers.common['version'] ='2.0'
// http 配置
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
http.defaults.baseURL = "/api/"

//返回状态判断
http.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data
  }
}, (err) => {
  if (err.message === 'Network Error') {
    return Toast('网络错误，请检查网络是否正常')
  }
  let httpStatus = err.response.data && err.response.data.httpStatus
  let status = err.response.status
  if (httpStatus === 502 || status === 500) {
    return Toast('服务升级中，请稍候再试')
  }
  Toast(err.message)
})

export default {

  get (url, data={}) {
    return http.get(url, {
      params: data,
      headers: {
        common: {
          Authorization: data.token,
        }
      }
    })
  },
  post (url, data={}) {
    return http.post(url, qs.stringify(data), {headers: {
      common: {
        Authorization: data.token,
      }
    }})
  },
  postJSON (url, data={}) {
    return http.post(url, data, {headers: {
      'Content-Type': 'application/json',
      common: {
        Authorization: data.token,
      }      
    }})
  },
  postFormData (url, data={}) {
    return http.post(url, qs.stringify(data), {headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      common: {
        Authorization: data.token,
      },
    }})
  },
  del (url, data={}) {
    return http.delete(url, {
      params: data
    })
  },
}
