// pages/hdbm/hdbm.js
Page({

 /**
  * 页面的初始数据
  */
 data: {
  array: ['参加素质拓展活动', '拔河比赛', '基恩素养活动', '数学建模'],
  itemLength: '',
  isSuccess:false
 },
 bindPickerChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
   index: e.detail.value
  })
 },
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
   console.log(getApp().data.isSuccess)
  console.log(getApp().data.userName)
  console.log(getApp().data.sessionId)
  console.log(getApp().data.fyId)
  console.log(getApp().data.shequId)
  let that = this;
  // 加载活动列表
  wx.request({
   url: `${getApp().data.url}business/secClassRoom/event/bmEventListQry`,
   method: 'POST',
   data: {
    "params": {
     "userName": getApp().data.userName,
     "sessionId": getApp().data.sessionId,
     "fyId": getApp().data.fyId,
     "shequId": getApp().data.shequId,
     "rxTime": getApp().data.rxTime
    }
   },
   header: {
    "Content-Type": "application/json"
   },
   success: function (res) {
    console.log(res.data.object.list);
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
     that.setData({
      item: res.data.object.list,
      itemLength: res.data.object.list.length
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
 bm: function (e) {
   this.setData({
     isSuccess:true
   })
  let eventId = e.currentTarget.dataset.eventid;
  console.log(eventId)
  let that = this;
  // 点击活动报名
  wx.request({
   url: `${getApp().data.url}business/secClassRoom/event/eventRegist`,
   method: 'POST',
   data: {
    "params": {
     "userName": getApp().data.userName,
     "sessionId": getApp().data.sessionId,
     "fyId": getApp().data.fyId,
     "shequId": getApp().data.shequId,
     "eventId": eventId,
     "rxTime": getApp().data.rxTime,
     "realname": getApp().data.realname,
     "fyName": getApp().data.fyName,
     "njId": getApp().data.njId,
     "njName": getApp().data.njName,
     "shequName": getApp().data.shequName,
     "className": getApp().data.className,
     "zyId": getApp().data.zyId,
     "zyName": getApp().data.zyName,
     "classes": getApp().data.classes,
     "bossOperator": getApp().data.bossOperator,
     "endOperator": getApp().data.endOperator,
     "sqbossOperator": getApp().data.sqbossOperator,
     "sqendOperator": getApp().data.sqendOperator,
     "userType": getApp().data.userType,
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

     if (res.data.object.resultCode == '0001') {
 
      wx.showModal({
       title: '提示',
       content: '已报名此活动，请勿重复报名',
       success: function (res) {
        if (res.confirm) {
         console.log('用户点击确定')
        }
       }
      })
     } else if (res.data.object.resultCode == '0000') {
      wx.showToast({
       title: '报名成功',
       duration: 2000
      })
      that.onLoad();
     }
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
 tzgg: function (e) {
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
 show_gg:function(e){
   let tzgg = e.currentTarget.dataset.noticstarttime;
   console.log(tzgg)
   wx.showModal({
     title: '活动说明',
     content: tzgg,
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
  //  this.onLoad();
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