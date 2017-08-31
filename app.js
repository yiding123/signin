//app.js

App({
  //引入sdk
  admx: require("./lib/admx-sdk/admx.js"),
  config: require("./config.js"),
  Session: require("./lib/admx-sdk/lib/session.js"),
  common: require("./utils/common.js"),
  utils: function () {
    return this.admx.utils
  },
  onLaunch: function () {
    //this.autoLogin();
  },

  globalData: {
    userInfo: null
  }
})