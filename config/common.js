module.exports={
  // 开发环境配置
  development: {
     mongo: {
        uri: 'mongodb://10.2.45.110:27017/test-koa'
      },
     port: '8080',
     qiniu: {  // 七牛云sdk配置 (仅供参考)
       ACCESS_KEY: '授权key',   // 示例：'SVDBGFNHBFSBFDNGSBRSVFDV'
       SECRET_KEY: '秘钥key',   // 示例：'XVDFNBDNTWGECdterfnfdvac345edfv'
       bucket: '空间',          // 示例: 'sinn'
       baseUrl: "http://oma6qcctt.bkt.clouddn.com/",
     },
     alioss: {  // 阿里云oss sdk配置  (仅供参考)
       region: '区域',              // 示例：'oss-cn-shenzhen'
       accessKeyId: '授权key',      // 示例：'SVDFBGBFBFDNGSBRSVFDV'
       accessKeySecret: '秘钥key',  // 示例：'WFEWVBGBFBFDNGSBRSVFFDBDV'
       bucket: '空间',              // 示例：'sinn'
       folder: 'images/'  // 上传到空间的images文件夹下，可自定义，文件夹需提前创建
     }
  },

  // 生产环境配置
  production: {
    mongo: {
        uri: 'mongodb://10.2.45.110:27017/an'
      },
     port: '8080',
     qiniu: { // 七牛云sdk配置 (仅供参考)
       ACCESS_KEY: '授权key',
       SECRET_KEY: '秘钥key',
       bucket: '空间',
       baseUrl: "http://oma6qcctt.bkt.clouddn.com/",
     },
     alioss: { // 阿里云oss sdk配置  (仅供参考)
       region: '区域',           
       accessKeyId: '授权key',
       accessKeySecret: '秘钥key',
       bucket: '空间',
       folder: 'images/'  // 上传到空间的images文件夹下，可自定义，文件夹需提前创建
     }
  }
}