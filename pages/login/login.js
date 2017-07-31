var app = getApp()

Page({
  data: {
    userInfo: {},
    name:null,
    num:null,
    submitting:false
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    var user = app.admx.Session.get().user;
    console.log(user);
    if(user && user.id){
      wx.redirectTo({
        url: '../cus/cus',
      })
    }
  },

  doLogin: function (e) {
    var that = this;
    console.log(e.detail.value);
    var serialNo = e.detail.value.serialNo;
    var password = e.detail.value.password;
    if(serialNo.length == 0){
      wx.showModal({
        showCancel:false,
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
    if (this.data.submitting){
      wx.showToast({
        title: '正在登录中,请勿重复提交',
      })
      return;
    }
    this.setData({
      submitting:true
    });
    wx.showLoading({
      title: '登录中...',
    })
    app.admx.login.loginBasic({
      url: app.config.service.loginWithAcctPwd,
      data:{
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
          wx.redirectTo({
            url: '../cus/cus',
          })
      },
      fail: function (res) {
        console.log(res);
        wx.showModal({
          content: "登录失败",
          showCancel: false
        });
      },
      complete:function(){
        wx.hideLoading();
        that.setData({
          submitting: false
        });
      }
    })

  }
})
