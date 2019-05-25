let baseURL = '' // 接口地址
switch (process.env.NODE_ENV) {
  case 'development': // 开发环境 192.168.10.62:8088
    baseURL = '//119.28.24.22:8000/'
    break
  case 'test': // 测试环境
    baseURL = '//test.zdgame888.com/'
    break
  case 'production': // 生产环境
    // 获取一级域名
    let firstLevelDomain = document.domain.split('.').slice(-2).join('.')
    baseURL = '//apigateway.' + firstLevelDomain + '/'
    break
  default:
    console.log('The process.env.NODE_ENV is undefined.')
}

export { baseURL }
