const localConfig = {
  DEV: {
    ENV: 'dev',
    BASE_API: '//gw-uo-test.61info.cn',
  },
  TEST: {
    ENV: 'test',
    BASE_API: '//gw-uo-test.61info.cn',
  },
  PRE: {
    ENV: 'pre',
    BASE_API: '',
  },
  PROD: {
    ENV: 'prod',
    BASE_API: '',
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
