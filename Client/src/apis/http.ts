import axios, { type AxiosInstance } from 'axios'
import Auth from '../services/auth.service'

// let retry = false
export const REACT_BACK_END_URL = 'https://backenddemoauth.onrender.com'

class AxiosCustom {
      instance: AxiosInstance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      refreshTokenPromise: any // this holds any in-progress token refresh requests

      constructor() {
            this.instance = axios.create({
                  baseURL: REACT_BACK_END_URL,
                  timeout: 1000 * 70,
                  headers: {
                        'Content-Type': 'application/json'
                  }
            })

            this.instance.interceptors.request.use(
                  (config) => {
                        console.log(123)
                        return config
                  },
                  (error) => Promise.reject(error)
            )

            //response
            this.instance.interceptors.response.use(
                  (res) => res,
                  async (error) => {
                        const originalRequest = error.config
                        console.log('rf')
                        if (
                              error.response?.status === 401 &&
                              error.response?.data.message === 'Unauthorized' &&
                              error.response?.data?.metadata === 'Token không đúng' &&
                              !originalRequest.retry
                        ) {
                              originalRequest.retry = true
                              // store.dispatch(addToast({ type: 'ERROR', message: 'Token hết hạn', id: Math.random().toString() }))
                              this.refreshTokenPromise = this.refreshTokenPromise
                                    ? this.refreshTokenPromise
                                    : Auth.refresh_token().finally(() => (this.refreshTokenPromise = null))
                              return this.refreshTokenPromise.then(
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    (data: any) => {
                                          // console.log({ data })
                                          const { token } = data.data.metadata

                                          if (!token) return Promise.reject(token)
                                          // store.dispatch(
                                          //   addToast({
                                          //     type: 'SUCCESS',
                                          //     message: 'Lấy thành công đang tiến hàng call lại api',
                                          //     id: Math.random().toString()
                                          //   })
                                          // )
                                          if (
                                                error.response.config.url === 'v1/api/account/update-avatar' ||
                                                error.response.config.url === 'v1/api/product/upload-product-thumb' ||
                                                error.response.config.url ===
                                                      'v1/api/product/upload-product-images-full' ||
                                                error.response.config.url === 'v1/api/product/update-product-thumb' ||
                                                error.response.config.url ===
                                                      'v1/api/product/update-product-images-full' ||
                                                error.response.config.url === 'v1/api/shop/upload-avatar-shop' ||
                                                error.response.config.url ===
                                                      'v1/api/product/upload-product-description-image-one' ||
                                                error.response.config.url ===
                                                      'v1/api/product/delete-product-description-image-one' ||
                                                error.response.config.url === 'v1/api/shop/register-shop'
                                          ) {
                                                console.log('dung url ne')
                                                error.config.headers['Content-Type'] = 'multipart/form-data'
                                                error.config.timeout = 20000
                                          }
                                          originalRequest.retry = false
                                          return this.instance(error.response.config)
                                    }
                              )
                        }

                        return Promise.reject(error)
                  }
            )
      }
}

const axiosCustom = new AxiosCustom().instance

export default axiosCustom
