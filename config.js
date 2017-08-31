/**
 * 小程序配置文件
 */

var constants = require("./lib/admx-sdk/lib/constants.js");
// 此处主机域名修改成腾讯云解决方案分配的域名
var host = constants.ADMX_HOST;
var custom = 'custom';
var apiUrlBase = host + "/" + custom;

var config = {
  // 下面的地址配合云端 Demo 工作
  service: {
    host,
    apiUrlBase: `${apiUrlBase}`
   
  }
};

module.exports = config;