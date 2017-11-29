//app.js
App({
 // https://languoxingchuang.com
 // http://118.89.49.82
 // wx01b0209e72c45cc3
 // businesscClassRoom/event/eventEnd
 // https://219.144.130.195:81/3e-platform-web
 // https://scx.eurasia.edu/3e-platform-web
 // https://www.nuoplus.com/3e-platform-intf
  data: {
   url: 'https://meetmecar.com/3e-platform-intf/ws/',
   // url: 'https://www.nuoplus.com:81/3e-platform-intf/ws/',
    userName:'',
    sessionId:'',
    fyId:'', 
    shequId:'',
    rxTime:'',
    userType:'',
    realname:''
  },
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
