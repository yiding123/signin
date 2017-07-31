//index.js
//获取应用实例
var app = getApp()
var util = require("../../utils/util.js")
Page({
  data: {
    list: [],
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: ''
      }]
    }]
  },
  onLoad: function () {
    console.log('onLoad')
    this.getWeb()

  },
  getWeb: function (i) {
    var that = this;
    app.admx.request({
      url: app.config.service.apiUrlBase + '/messages',

      succ: function (res) {

        var result = res.list;
        console.log(result)

        var jsList = [];
      
        for (var i = 0; i < result.length; i++) {
          jsList.push({
            message_id: result[i].id,
            time: result[i].time,
            title: result[i].title
          })
        
        }
      
        that.setData({
          list: jsList,
          hidden: true,//load等待按钮
         
        })
      }
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})
