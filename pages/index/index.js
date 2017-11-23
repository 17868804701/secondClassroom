// pages/hdbm/hdbm.js
Page({

 /**
  * 页面的初始数据
  */
 data: {

 },
 hdbm: function () {
  wx.navigateTo({
   url: '../hdbm/hdbm',
  })
 },
 hdyuyueck: function () {
  wx.navigateTo({
   url: '../yuyueck/yuyueck',
  })
 },
 hdqd: function () {
  wx.navigateTo({
   url: '../hdqd/hdqd',
  })
 },
 apply_xfList: function () {
  wx.navigateTo({
   url: '../apply_xfList/apply_xfList',
  })
 },
 sh: function () {
  wx.navigateTo({
   url: '../sh/sh',
  })
 },
 xfmx: function () {
  wx.navigateTo({
   url: '../xfmx/xfmx',
  })
 },
 xxlb:function(){
  wx.navigateTo({
   url: '../xxlb/xxlb',
  })
 },
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
  let usertype = getApp().data.userType
  this.setData({
   userType: usertype
  })
  console.log(this.data.userType)
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