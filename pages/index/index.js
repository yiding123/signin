//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    user: {},
    list: {},
    address: [],
    far: null

  },
  onLoad: function (e) {
    var that = this;
    var user = app.admx.Session.get().user;
    console.log(user);
    if (user == null) {
      wx.redirectTo({
        url: '../login/login',
      })
      return
    } else {
      that.setData({
        user: user
      })
    }


  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  getaddress: function () {
    var name = this.data.user.account;
    console.log(this.data)
    var that = this;

    // 获取用户应该签到的地址位置
    app.admx.request({
      url: app.config.service.apiUrlBase + '/getLoc',
      succ: function (res) {
        console.log(res)
        var loc = res.list[0].loc
        that.setData({
          address: loc.split(",")
        })
      }

    })


    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var result = res
        console.log(res);
        that.setData({
          list: result
        })
        // console.log(that.data.list)
        var lat1 = that.data.list.latitude;
        var lng1 = that.data.list.longitude;
        var lat2 = that.data.address[1];
        var lng2 = that.data.address[0];
        // console.log(lat1 + "," + lng1)
        // console.log(lat2+","+lng2)

        var distance = app.common.getDistance(lat1, lng1, lat2, lng2);
        console.log("distance:" + distance)
        that.setData({
          far: distance
        })
      },
    })
  },
  doBegin: function (e) {
    var name = this.data.user.account;
    var course = e.detail.value.class
    var far = this.data.far;
    console.log(far + "skhjashfjh")
    if(!far){
      wx.showModal({
        showCancel: false,
        content: '定位错误'
      })
      return
    }
    if (course.length == 0 || far == null) {
      wx.showModal({
        showCancel:false,
        content: '地址,课程名称不能为空'
      })
      return
    }
    if (far < 10) {
      wx.showToast({
        title: '正在签到中,请勿重复签到',
      })
      app.admx.request({
        url: app.config.service.apiUrlBase + '/qiandao',
        data: {
          course: course
        },
        succ: function (res) {
          console.log(res)
        }
      })
      wx.showModal({
        content: "签到成功",
        showCancel: false
      });
    } else {
      wx.showModal({
        content: "当前位置距离上课位置太远了，走近签到试试",
        showCancel: false
      });

    }


  }


})