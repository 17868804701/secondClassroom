// pages/yuyueck/yuyueck.js
Page({
 /**
  * 页面的初始数据
  */
 data: {
  bgLeft: "#01b8ab",
  cLeft: "white",
  bLeft: '#01b8ab',
  bgRight: "white",
  cRight: "#333",
  bRight: "gainsboro",
  L: "",
  R: "none",
  icon_url: "../images/down.png",
  display: "true",
  status: '1'
 },

 activity: function (e) {
  var id = e.currentTarget.id;
  let index = e.currentTarget.dataset.index;
  let list = this.data.ycjlist;
  for (var i = 0, len = list.length; i < len; ++i) {
   console.log(list[i].evenName)
   if (list[i].evenName == id) {
    list[i].open = !list[i].open;
   } else {
    list[i].open = false;
   }
  }
  this.setData({
   ycjlist: list
  });
 },


 activity1: function (e) {
  var id = e.currentTarget.id;
  let index = e.currentTarget.dataset.index;
  let list = this.data.wcjlist;
  for (var i = 0, len = list.length; i < len; ++i) {
   console.log(list[i].evenName)
   if (list[i].evenName == id) {
    list[i].open = !list[i].open;
   } else {
    list[i].open = false;
   }
  }
  this.setData({
   wcjlist: list
  });
 },





 left: function () {
  this.setData({
   bgRight: "white",
   cRight: "#333",
   bRight: "gainsboro",
   R: 'none',
   L: '',
   bgLeft: "#01b8ab",
   cLeft: "white",
   bLeft: '#01b8ab',
  })
 },
 right: function () {
  this.setData({
   bgRight: "#01b8ab",
   cRight: "white",
   bRight: '#01b8ab',
   R: '',
   L: 'none',
   bgLeft: "white",
   cLeft: "#333",
   bLeft: "gainsboro"
  })
 },
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
  let userName = getApp().data.userName
  let realname = getApp().data.realname
  this.setData({
   username: userName,
   realname: realname
  })
  let that = this;
  wx.request({
   url: `${getApp().data.url}business/secClassRoom/clsEventListQry`,
   method: 'POST',
   data: { "params": { "userName": getApp().data.userName, "sessionId": getApp().data.sessionId } },
   header: {
    "Content-Type": "application/json"
   },
   success: function (res) {

    if (res.data.resultCode == '-9999') {
     wx.showModal({
      title: '提示',
      content: '网络异常',
      success: function (res) {
       if (res.confirm) {
        console.log('用户点击确定')
       }
      }
     })
    } else if (res.data.resultCode == '-1111') {
     wx.showModal({
      title: '登录提示',
      content: '登录超时，跳转到主页...',
      success: function (res) {
       if (res.confirm) {
        wx.redirectTo({
         url: '../login/login',
        })
       } else if (res.cancel) {
        wx.redirectTo({
         url: '../login/login',
        })
       }
      }
     })
    } else {
     console.log(res.data.object.wcjlist)
     console.log(res.data.object.ycjlist)
     that.setData({
      wcjlist: res.data.object.wcjlist,
      ycjlist: res.data.object.ycjlist,
      wcjlistLength: res.data.object.wcjlist.length,
      ycjlistLength: res.data.object.ycjlist.length
     })
    }
   }
   ,
   fail: function (err) {
    console.log(err)
   },
   complete: function (data) {

   }
  })

 },
 chakan: function (e) {
  let noticAddress = e.currentTarget.dataset.noticaddress;
  let noticDesc = e.currentTarget.dataset.noticdesc;
  let noticEndTime = e.currentTarget.dataset.noticendtime;
  let noticStartTime = e.currentTarget.dataset.noticstarttime;
  wx.showModal({
   title: '活动通知公告',
   content: '活动有所变更，具体通知如下,时间：' + noticStartTime + '至' + noticEndTime + '，地点：' + noticAddress + '，备注:' + noticDesc,
   success: function (res) {
    if (res.confirm) {
     console.log('用户点击确定')
    } else if (res.cancel) {
     console.log('用户点击取消')
    }
   }
  })
 },

 /**
  * 生命周期函数--监听页面初次渲染完成
  */
 onReady: function () {

 },

 /**
  * 生命周期函数--监听页面显示
  */
 onShow: function () {

 },

 /**
  * 生命周期函数--监听页面隐藏
  */
 onHide: function () {

 },

 /**
  * 生命周期函数--监听页面卸载
  */
 onUnload: function () {

 },

 /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
 onPullDownRefresh: function () {

 },

 /**
  * 页面上拉触底事件的处理函数
  */
 onReachBottom: function () {

 },

 /**
  * 用户点击右上角分享
  */
 onShareAppMessage: function () {

 }
})