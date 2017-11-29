//login.js
//获取应用实例
// var app = getApp();
Page({
 data: {
  remind: '加载中',
  help_status: false,
  userid_focus: false,
  passwd_focus: false,
  userid: '',
  passwd: '',
  angle: 0
 },
 onReady: function () {
  var _this = this;
  setTimeout(function () {
   _this.setData({
    remind: ''
   });
  }, 1000);
 },
 //监听账号登录
 userInput: function (e) {
  this.data.username = e.detail.value;
 },
 pwdInput: function (e) {
  this.data.password = e.detail.value;
 },
 login: function () {
  // 登录接口
  if (this.data.username == undefined || this.data.password == undefined) {
   wx.showModal({
    title: '登录提示',
    content: '账号或密码不能为空,请重新输入',
    success: function (res) {
     if (res.confirm) {
      console.log('用户点击确定')
     }
    }
   })
  } else {
   wx.request({
    url: `${getApp().data.url}business/login`,
    method: 'POST',
    data: { "params": { "userName": this.data.username, "password": this.data.password } },
    header: {
     "Content-Type": "application/json"
    },
    success: function (res) {
     // 保存sessionid和userName
     console.log(res.data)
     getApp().data.sessionId = res.data.object.sessionId
     getApp().data.userName = res.data.object.userName
     getApp().data.fyId = res.data.object.fyId
     getApp().data.shequId = res.data.object.shequId
     getApp().data.realname = res.data.object.realname
     getApp().data.fyName = res.data.object.fyName
     getApp().data.userType = res.data.object.userType
     getApp().data.rxTime = res.data.object.rxTime
     getApp().data.njId = res.data.object.njId
     getApp().data.njName = res.data.object.njName
     getApp().data.shequName = res.data.object.shequName
     getApp().data.className = res.data.object.className
     getApp().data.zyId = res.data.object.zyId
     getApp().data.zyName = res.data.object.zyName
     getApp().data.classes = res.data.object.classes
     getApp().data.bossOperator = res.data.object.bossOperator
     getApp().data.endOperator = res.data.object.endOperator
     getApp().data.sqbossOperator = res.data.object.sqbossOperator
     getApp().data.sqendOperator = res.data.object.sqendOperator
     getApp().data.userType = res.data.object.userType
     if (res.data.resultCode == '-9999') {
      wx.showModal({
       title: '登录提示',
       content: '网络异常',
       success: function (res) {
        if (res.confirm) {
         console.log('用户点击确定')
        }
       }
      })
     } else {
      if (res.data.object.resultCode == '-9999') {
       wx.showModal({
        title: '登录提示',
        content: '用户名或密码错误，请重新登录',
        success: function (res) {
         if (res.confirm) {
          console.log('用户点击确定')
         }
        }
       })
      } else {
       console.log(res.data)
       wx.showToast({
        title: '登录成功',
        duration: 2000
       })
       wx.redirectTo({
        url: '../main/main',
       })
      }
     }
    }
    ,
    fail: function (err) {

    },
    complete: function (data) {

    }
   })
  }
 },
 onLoad: function () {

 },
 inputFocus: function (e) {
  if (e.target.id == 'userid') {
   this.setData({
    'userid_focus': true
   });
  } else if (e.target.id == 'passwd') {
   this.setData({
    'passwd_focus': true
   });
  }
 },
 inputBlur: function (e) {
  if (e.target.id == 'userid') {
   this.setData({
    'userid_focus': false
   });
  } else if (e.target.id == 'passwd') {
   this.setData({
    'passwd_focus': false
   });
  }
 },
 showHelp: function (e) {
  this.setData({
   'help_status': true
  });
 },
 hideHelp: function (e) {
  this.setData({
   'help_status': false
  });
 },
 btn:function(){
  wx.request({
   url: "https://scx.eurasia.edu:81/mtmc-wx/ws/business/phoneCodeQry/",
   method: 'POST',
   data: { "params": { "openId": "111", "phoneNum": "17868804701" } },
   header: {
    "Content-Type": "application/json"
   },
   success: function (res) {
    console.log(res.data);
    wx.showToast({
     title: '获取验证码成功',
     duration: 2000
    })
   },
   fail: function (err) {
    console.log(err)
   },
   complete: function (data) {
    console.log(data)
   }
  });
 }
});