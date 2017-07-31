//app.js

App({
  //引入sdk
  admx: require("./lib/admx-sdk/admx.js"),
  config: require("./config.js"),
  Session: require("./lib/admx-sdk/lib/session.js"),
  common:require("./utils/common.js"),
  utils: function () {
    return this.admx.utils
  },
  onLaunch: function () {
    this.autoLogin();
  },
  //自动登录
  autoLogin: function () {
    var that = this;
    this.admx.login.login({
      url: this.config.service.autologin,
      method: "GET",
      succ: function (res) {
        console.log("--login success");
        console.log(res);
        if (res.user) {//已绑定了微信
          var user = that.common.transUserInfo(res.user);
          var session = that.admx.Session.get();
          session.user = user;
          console.log(user);
          that.admx.Session.set(session);
        } else {//否则停留登录页面
       
        }
      },
      complete: function (res) {

      },
      fail: function (res) {
        console.log(res);
        wx.showModal({
          content: "登录失败",
          showCancel: false
        });
      }
    });
  },

  globalData: {
    userInfo: null
  }
})