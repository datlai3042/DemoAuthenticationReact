import axios, { type AxiosError } from 'axios'

export const checkAxiosError = <T>(error: Error): error is AxiosError<T> => {
      return axios.isAxiosError(error)
}

export const generateIdToast = () => {
      return Math.random().toString()
}
