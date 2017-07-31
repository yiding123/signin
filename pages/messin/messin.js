//index.js
//获取应用实例
var util = require("../../utils/util.js")
var app = getApp()
Page({
  data: {
    writeDiary: false,
    loading: false,
    list: {
      id: "",
      title: "",
      time: "",
      content: "",
      modifyDiarys: false
    
    },
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
  onLoad: function (e) {
    var message_id = e.id;
    var that = this;
    console.log(message_id)
    app.admx.request({
      url: app.config.service.apiUrlBase + '/messin',
      data: {
        message_id: message_id
      },
      succ: function (res) {

        var result = res.list;
        console.log(result)

        that.setData({
          list: result[0],
          nodes: result[0].content
        })

      }
    })


  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  toAddDiary:function(){
    var that = this;
    console.log('已点击')
    that.setData({
      writeDiary: true
    })
  },
   noneWindows: function () {
     var that = this;
    that.setData({
      writeDiary: "",
      modifyDiarys: ""
    })
  },
  addDiary :function(e){
    console.log(e.detail.value)
    var title = e.detail.value.title;
    var content = e.detail.value.content;
    if(title.length == 0 || content.length == 0){
        wx.showModal({
          title: '提交失败',
          content: '标题和内容不能为空'
        })
        return
    }

    app.admx.request({
      url: app.config.service.apiUrlBase + '/message',
      data:{
        title:title,
        content:content
      },
      succ: function (res) {
        console.log(res)
      }
    })
    
  }
  

})
