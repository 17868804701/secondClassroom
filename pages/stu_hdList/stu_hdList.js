// pages/stu_hdList/stu_hdList.js
Page({

 /**
  * 页面的初始数据
  */
 data: {
  statu: '',
  statu_all: '',
  selectLength:""
 },
 // 跳转到活动审核页面
 hdsh: function (e) {
  console.log(e);
  let createtime = e.currentTarget.dataset.createtime
  let creator = e.currentTarget.dataset.creator
  let jbname = e.currentTarget.dataset.jbname
  let mkname = e.currentTarget.dataset.mkname
  let startxf = e.currentTarget.dataset.startxf
  let xmname = e.currentTarget.dataset.xmname
  let orderid = e.currentTarget.dataset.orderid
  let evenname = e.currentTarget.dataset.evenname
  let realname = e.currentTarget.dataset.realname
  wx.redirectTo({
   url: `../hdshInfo/hdshInfo?createtime=${createtime}&&creator=${creator}&&jbname=${jbname}&&mkname=${mkname}&&startxf=${startxf}&&xmname=${xmname}&&orderid=${orderid}&&evenname=${evenname}&&realname=${realname}`,
  })
 },
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
  let eventId = options.eventId
  console.log(eventId)
  this.setData({
   eventId: eventId
  })
  let that = this;
  // 加在学生活动报名列表
  wx.request({
   url: `${getApp().data.url}business/common/homeTaskList`,
   method: 'POST',
   data:
   {
    "params": {
     "sessionId": getApp().data.sessionId,
     "userName": getApp().data.userName,
     "creator": "",
     "type": "secClassRoom",
     "isEvent": "1",
     "isXCX": "1",
     "eventId": this.data.eventId
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
     console.log(res.data.object.list);
     that.setData({
      stu_hdList: res.data.object.list,
      stu_hdListLength: res.data.object.list.length
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
 checkboxChange: function (e) {
  console.log(e)
  console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  this.setData({
   hdList: e.detail.value,
   selectLength: e.detail.value.length
  })
  if (e.detail.value.length == this.data.stu_hdListLength) {
   this.setData({
    statu_all: "true"
   })
  } else {
   this.setData({
    statu_all: ""
   })
  }
  console.log(this.data.hdList + "复选框组")
 },
 // 全选
 select_all: function () {
  var arrList = []
  if (this.data.statu == '') {
   this.setData({
    statu: "true",
    statu_all: "true"
   })
   for (var i = 0; i < this.data.stu_hdList.length; i++) {
    arrList.push(this.data.stu_hdList[i].orderId)
   }
   this.setData({
    hdList: arrList,
    selectLength: "1"
   })
   console.log(this.data.hdList + "全选")
  } else {
   this.setData({
    statu: "",
    hdList: "",
    selectLength:"0"
   })
  }
 },
 // 挑喜欢到批量审核页面
 plshenhe: function () { 
  console.log(this.data.selectLength)
  if (this.data.selectLength < 1 || this.data.selectLength == undefined){
    wx.showModal({
     title: '提示',
     content: '请选择要操作的内容',
    })
  }else{
   wx.navigateTo({
    url: '../plshenhe/plshenhe?hdList=' + this.data.hdList,
   })
  }
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