import createAxios from './createAxios'

// h5的业务axios
export const baseAxios = createAxios({
  baseURL: process.env.BASE_API
})
