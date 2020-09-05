import createAxios from './createAxios'

// h5的业务axios
export const activityAxios = createAxios({
  baseURL: process.env.BASE_API + '/hll-activity'
})
