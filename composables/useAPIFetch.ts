import { ElMessage, ElLoading } from 'element-plus'
import {useRuntimeConfig, useCookie, clearAllCookie, useFetch} from '#imports'

const text = '服务器出错，请联系管理员'


const handleError =(response, message?:String) => {
  ElMessage({
    showClose: true,
    message:  response?._data?.message ?? message ?? text,
    type: 'error',
  })
}


export const useMyFetch = (request, opts) => {
  const config = useRuntimeConfig()
  opts.onRequest = ({ request, options }) => {
    console.log('拦截请求:', request)
    const cookie = useCookie('website-login-cookie')

    options.headers = {
      "Content-Type": "application/json",
      "Authorization": cookie.value || ''
    }

    options.headers

  }
  opts.onResponse = ({ request, response, options }) => {
    const respData = response._data
    if (respData.code === 900) { 
      // 登录失效了
      // const cookie = useCookie('website-login-cookie')
      // console.log('cookie: ', cookie)
      // cookie.value = null
      clearAllCookie()
      handleError(response, '登录已失效，请重新登录，将在3秒后跳转首页')
      setTimeout(() => {
        window.location.replace('/')
      }, 1000 * 3)
      return Promise.reject(response._data)
    }
    else if (respData.code !== 200) {
      handleError(response)
      return Promise.reject(response._data)
    } else {
      return respData
    }
  }
  return useFetch(request, { baseURL: config.public.baseURL, ...opts })
}
