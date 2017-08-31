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
    role:null,
    name:null,
    comments:[],
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
    console.log(this.data)
  //  获取文章内容
    var message_id = e.id;
    var that = this;
    console.log('文章id'+message_id)
    
    app.admx.request({
      url: app.config.service.apiUrlBase + '/messin',
      data: {
        message_id: message_id
      },
      succ: function (res) {
        console.log('----messin');
        console.log(res);
        var result = res.list;
        console.log(result)

        that.setData({
          list: result[0],
          nodes: result[0].content
        })

      }
    })
    var user = app.admx.Session.get().user;
    var name = user.account;
    var role = user.role;
    that.setData({
      name:name,
      role:role
    })
    // 获取评论内容
    var atrid = e.id;
    console.log('ping' + atrid)
   
    console.log(name);
    app.admx.request({
      url: app.config.service.apiUrlBase + '/comments',
      data:{
        atrid: atrid
      },
      succ:function(res){
        console.log(res.list)
        var comments = res.list;
        that.setData({
          comments:comments
        })
      }
    })

   
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
    var role = this.data.role;
    var name = this.data.name;
    var that = this;
    console.log(e.detail.value)
    var content = e.detail.value.content;
    var atrid = e.detail.value.id;
   
    if(content.length == 0){
        wx.showModal({
          title: '提交失败',
          content: '标题和内容不能为空'
        })
        return
    }

    app.admx.request({
      url: app.config.service.apiUrlBase + '/comment',
      data:{
        content:content,
        atrid: atrid
      },
      succ: function (res) {
        console.log(res)
        var newcomments = that.data.comments;
        var user = app.Session.get().user;
        console.log(user);
        newcomments.push({
          content: content,
          time: app.common.dateFormat('yyyy-MM-dd hh:mm:ss',new Date()),
          id:res.primaryKey,
          name:user.name,
          role:user.role
        });
        
        that.setData({
          comments: newcomments,
          writeDiary: false,
          loading: false
        })
      }
    })
    
  }
  

})
