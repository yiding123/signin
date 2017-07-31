//index.js
//获取应用实例
var app = getApp()
// var that;
Page({
  data: {
    userInfo: {},
    name:null,
    num:null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  loginBtn: function () {
    var name = this.data.name;
    var num = this.data.num;

    console.log('点击了' + name+","+num)
    app.admx.request({
      url: app.config.service.apiUrlBase + '/student',
      data:{
       name: name,
       num: num
      },
      succ: function (res) {
          console.log(res)
          var list = res.list[0];
          if(list !== null){
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 500
            })
            wx.redirectTo({
              url: '../cus/cus',
            })

          }
      }
    })

  },
  nameInput :function(event){
   
    console.log(event)
    // this.setData({ username: event.detail.value })
  
    this.data.name = event.detail.value;
    
  },
  numInput: function (event) {
    this.data.num = event.detail.value;
  }
 

})
