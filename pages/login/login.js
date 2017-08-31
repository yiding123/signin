var app = getApp()

Page({
  data: {
    userInfo: {},
    name: null,
    num: null,
    submitting: false
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    this.autoLogin();
  },

  //自动登录
  autoLogin: function () {
    var that = this;
    app.admx.login.login({
      succ: function (res) {
        console.log("--login success");
        console.log(res);
        if (res.user) {//已绑定了微信
          var user = app.common.transUserInfo(res.user);
          var session = app.admx.Session.get();
          session.user = user;
          console.log(user);
          app.admx.Session.set(session);
          wx.switchTab({
            url: '../index/index',
          })
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

  doLogin: function (e) {
    var that = this;
    console.log(e.detail.value);
    var serialNo = e.detail.value.serialNo;
    var password = e.detail.value.password;
    if (serialNo.length == 0) {
      wx.showModal({
        showCancel: false,
        content: '请输入学号'
      })
      return;
    }
    if (password.length == 0) {
      wx.showModal({
        showCancel: false,
        content: '请输入密码'
      })
      return;
    }
    if (this.data.submitting) {
      wx.showToast({
        title: '正在登录中,请勿重复提交',
      })
      return;
    }
    this.setData({
      submitting: true
    });
    wx.showLoading({
      title: '登录中...',
    })
    app.admx.login.loginBasic({
      data: {
        account: serialNo,
        password: password
      },
      succ: function (res) {
        console.log(res)
        var user = app.common.transUserInfo(res.user);
        console.log(user);
        var session = app.admx.Session.get();
        session.user = user;
        app.admx.Session.set(session);
        wx.switchTab({
          url: '../index/index',
        })
      },
      fail: function (res) {
        console.log(res);
        wx.showModal({
          content: "登录失败",
          showCancel: false
        });
      },
      complete: function () {
        wx.hideLoading();
        that.setData({
          submitting: false
        });
      }
    })

  }
})
