const localConfig = {
  DEV: {
    ENV: 'dev',
    BASE_API: '',
  },
  TEST: {
    ENV: 'test',
    BASE_API: '',
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
        PROCESS_ENV: env && env.toLocaleLowerCase(),
        NODE_ENV: "production"
      },
      conf[env] || {}
    )
  })
  return conf
})(localConfig)
