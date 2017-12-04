// pages/hdbm/hdbm.js
Page({

 /**
  * 页面的初始数据
  */
 data: {
  array: ['参加素质拓展活动', '拔河比赛', '基恩素养活动', '数学建模'],
  itemLength: ''
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
  let that = this;
  // 加载活动定位列表
  wx.request({
   url: `${getApp().data.url}business/secClassRoom/event/eventListQry`,
   method: 'POST',
   data: { "params": { "userName": getApp().data.userName, "sessionId": getApp().data.sessionId, "fyId": getApp().data.fyId, "shequId": getApp().data.shequId } },
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
  let eventId = e.currentTarget.dataset.eventid;
  console.log(eventId)
  wx.showLoading({
   title: '正在定位中...',
  })
  // 活动定位
  wx.getLocation({
   type: 'wgs84',
   success: function (res) {
    var latitude = res.latitude
    var longitude = res.longitude
    var speed = res.speed
    var accuracy = res.accuracy
    console.log("经度：" + latitude + ",维度：" + longitude)
    if (latitude != '' && longitude != '') {
     wx.hideLoading()
     let that = this;
     wx.request({
      url: `${getApp().data.url}business/secClassRoom/event/eventDingW`,
      method: 'POST',
      data: { "params": { "userName": getApp().data.userName, "sessionId": getApp().data.sessionId, "eventId": eventId, "lat": latitude, "log": longitude } },
      header: {
       "Content-Type": "application/json"
      },
      success: function (res) {
       console.log(res.data)
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
        if (res.data.object.resultCode == '0000') {
         wx.showModal({
          title: '定位提示',
          content: '该活动定位已经完成，请学生进行活动签到',
          success: function (res) {
           if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack({
             url: '../sh/sh',
            })
           }
          }
         })
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
    }
   }
  })
 },
 show_gg: function (e) {
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
 fqqt: function (e) {
  let eventId = e.currentTarget.dataset.eventid;
  console.log(eventId)
  wx.request({
   url: `${getApp().data.url}business/secClassRoom/event/eventEnd`,
   method: 'POST',
   data: { "params": { "userName": getApp().data.userName, "sessionId": getApp().data.sessionId, "eventId": eventId } },
   header: {
    "Content-Type": "application/json"
   },
   success: function (res) {
    console.log(res.data)
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
     wx.showModal({
      title: '签退提示',
      content: '活动已经结束，请学生进行活动签退',
      success: function (res) {
       if (res.confirm) {
        console.log('用户点击确定')
        wx.navigateBack({
         url: '../sh/sh',
        })
       }
      }
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