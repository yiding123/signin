//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    name:null,
    num:null,
    user:{}
  },
  onLoad: function (e) {
    var that = this;
    console.log(e)
    
   
  },
  getaddress:function(){
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        
      }
    }) 
    console.log(wx.getLocation.latitude + ',' + wx.getLocation.longitude)
  },
  aa: function(){
    console.log(app)
    // var code = '9c9140cb87d543da8b4afa3b4fdbc39f'

    // app.admx.request({
    //   url: app.config.service.apiUrlBase + '/ids',
    //   data: {
    //     code:code
    //   },
    //   succ: function (res) {
    //     console.log(res)
    //   }
    // })
  }
})