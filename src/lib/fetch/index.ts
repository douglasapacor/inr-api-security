import axios, { AxiosHeaders, AxiosResponse } from "axios"
export type requestResponse<T = any> = {
  success: boolean
  data?: T
  message?: string
}

const instance = axios.create()

const get = async <T = any>(
  url: string,
  headers?: AxiosHeaders
): Promise<requestResponse<T>> => {
  try {
    const requestHTTP: AxiosResponse<requestResponse<T>> = await instance.get(
      url,
      {
        headers
      }
    )

    if (requestHTTP.status === 200) {
      if (requestHTTP.data.data) {
        return {
          success: requestHTTP.data.success,
          data: requestHTTP.data.data,
          message: requestHTTP.data.message
        }
      } else {
        return {
          success: requestHTTP.data.success,
          message: requestHTTP.data.message
        }
      }
    } else {
      return {
        success: false,
        message: requestHTTP.data.message
      }
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message
    }
  }
}

const post = async <T = any>(
  url: string,
  body?: any,
  headers?: AxiosHeaders
): Promise<requestResponse<T>> => {
  try {
    const requestHTTP: AxiosResponse<requestResponse<T>> = await instance.post(
      url,
      body,
      {
        headers
      }
    )

    if (requestHTTP.status === 200) {
      if (requestHTTP.data.data) {
        return {
          success: requestHTTP.data.success,
          data: requestHTTP.data.data,
          message: requestHTTP.data.message
        }
      } else {
        return {
          success: requestHTTP.data.success,
          message: requestHTTP.data.message
        }
      }
    } else {
      return {
        success: false,
        message: requestHTTP.data.message
      }
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message
    }
  }
}

const put = async <T = any>(
  url: string,
  body?: any,
  headers?: AxiosHeaders
): Promise<requestResponse<T>> => {
  try {
    const requestHTTP: AxiosResponse<requestResponse<T>> = await instance.put(
      url,
      body,
      {
        headers
      }
    )

    if (requestHTTP.status === 200) {
      if (requestHTTP.data.data) {
        return {
          success: requestHTTP.data.success,
          data: requestHTTP.data.data,
          message: requestHTTP.data.message
        }
      } else {
        return {
          success: requestHTTP.data.success,
          message: requestHTTP.data.message
        }
      }
    } else {
      return {
        success: false,
        message: requestHTTP.data.message
      }
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message
    }
  }
}

const del = async <T = any>(
  url: string,
  headers?: AxiosHeaders
): Promise<requestResponse<T>> => {
  try {
    const requestHTTP: AxiosResponse<requestResponse<T>> =
      await instance.delete(url, {
        headers
      })

    if (requestHTTP.status === 200) {
      if (requestHTTP.data.data) {
        return {
          success: requestHTTP.data.success,
          data: requestHTTP.data.data,
          message: requestHTTP.data.message
        }
      } else {
        return {
          success: requestHTTP.data.success,
          message: requestHTTP.data.message
        }
      }
    } else {
      return {
        success: false,
        message: requestHTTP.data.message
      }
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message
    }
  }
}

export default {
  get,
  post,
  put,
  del
}
