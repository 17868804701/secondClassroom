// pages/hdsh/hdsh.js
Page({

 /**
  * 页面的初始数据
  */
 data: {

 },
 hdshInfo: function (e) {
  console.log(e);
  let createtime = e.currentTarget.dataset.createtime
  let creator = e.currentTarget.dataset.creator
  let jbname = e.currentTarget.dataset.jbname
  let mkname = e.currentTarget.dataset.mkname
  let startxf = e.currentTarget.dataset.startxf
  let xmname = e.currentTarget.dataset.xmname
  let orderid = e.currentTarget.dataset.orderid
  let evenname = e.currentTarget.dataset.evenname
  wx.navigateTo({
   url: `../hdshInfo/hdshInfo?createtime=${createtime}&&creator=${creator}&&jbname=${jbname}&&mkname=${mkname}&&startxf=${startxf}&&xmname=${xmname}&&orderid=${orderid}&&evenname=${evenname}`,
  })
 },
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
  let that = this;
  wx.request({
   url: `${getApp().data.url}business/common/homeTaskList`,
   method: 'POST',
   data: {
    "params": {
     "userName": getApp().data.userName,
     "sessionId": getApp().data.sessionId,
     "creator": "",
     "type": "secClassRoom",
     "isEvent": "1",
     "isXCX": "1"
    }
   },
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
     console.log(res.data.object.clsRoomList.length)
     that.setData({
      list: res.data.object.clsRoomList,
      listLength: res.data.object.clsRoomList.length
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