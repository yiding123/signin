/**
 * 小程序配置文件
 */


// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'http://localhost:8080/admxrest';
var custom = 'custom';
var apiUrlBase = host + "/" + custom ;

var config = {
    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        // 登录地址，用于建立会话
        autologin: `${host}/auth/wxapp`,
        // 账号密码绑定微信
        loginWithAcctPwd: `${host}/auth/wxapp/basic`,
        apiUrlBase : `${apiUrlBase}`
    }
};

module.exports = config;