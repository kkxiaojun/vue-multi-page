const localConfig = {
  DEV: {
    ENV: 'dev',
    BASE_API: '//gw-uo-dev.61info.cn',
    LOGIN_TOKEN_API: '//apptest.61draw.com',
  },
  TEST: {
    ENV: 'test',
    BASE_API: '//gw-uo-test.61info.cn',
    LOGIN_TOKEN_API: '//apptest.61draw.com'
  },
  PRE: {
    ENV: 'pre',
    BASE_API: '//gw-uo-preprod.61info.cn',
    LOGIN_TOKEN_API: '//app-preprod.61draw.com',
  },
  PROD: {
    ENV: 'prod',
    BASE_API: '//gw-uo.61info.cn',
    LOGIN_TOKEN_API: '//app.61draw.com',
  }
}

module.exports = (conf => {
  const systemEnvs = ["DEV", "PROD", "TEST", "PRE"]

  systemEnvs.forEach(env => {
    conf[env] = Object.assign(
      {
        BASE_API: "/",
        PROCESS_ENV: env.toLocaleLowerCase(),
        NODE_ENV: "production"
      },
      conf[env] || {}
    )
  })
  return conf
})(localConfig)
