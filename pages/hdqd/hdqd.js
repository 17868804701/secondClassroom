// pages/hdqd/hdqd.js
Page({

 /**
  * 页面的初始数据
  */
 data: {
  hdlistLength: ''
 },
 qt: function (e) {
  let orderId = e.currentTarget.dataset.orderid;
  let state = e.currentTarget.dataset.state;
  let eventId = e.currentTarget.dataset.eventid;
  wx.showLoading({
    title: '正在定位中...',
  })
  // 允许从相机和相册扫码
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
     // 获取经纬度成功后调用扫码
     wx.request({
      url: `${getApp().data.url}business/secClassRoom/event/eventQDQT`,
      method: 'POST',
      data: { "params": { "userName": getApp().data.userName, "sessionId": getApp().data.sessionId, "orderId": orderId, "state": state, "eventId": eventId, "lat": latitude, "log": longitude } },
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
        if (res.data.object.resultCode == '0002') {
         wx.showModal({
          title: '签退提示',
          content: '活动还没有结束，不能签到',
          success: function (res) {
           if (res.confirm) {
            console.log('用户点击确定')

           }
          }
         })
        } else if (res.data.object.resultCode == '0000') {
         wx.showModal({
          title: '签退提示',
          content: '签退成功！',
          success: function (res) {
           if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack({
             url: '../index/index',
            })
           }
          }
         })
        } else {
         wx.showModal({
          title: '签退提示',
          content: '签退失败，请稍后重试',
          success: function (res) {
           if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack({
             url: '../index/index',
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



 qd: function (e) {
  let orderId = e.currentTarget.dataset.orderid;
  let state = e.currentTarget.dataset.state;
  let eventId = e.currentTarget.dataset.eventid;

  wx.showLoading({
   title: '正在定位中...',
  })
  // 允许从相机和相册扫码
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
     // 获取经纬度成功后调用扫码
     wx.showModal({
      title: '签到提示',
      content: '请继续进行扫码签到',
      success: function (res) {
       if (res.confirm) {
        wx.scanCode({
         success: (res) => {
          console.log(res.result)
          //id=11,eventName=111
          let content = res.result.trim();
          content = content.substring(3, content.indexOf(","));
          // 扫码获取的活动id和活动本身id相等的话，调用签到接口，否则签到失败
          console.log(content);
          if (content == eventId) {
           wx.request({
            url: `${getApp().data.url}business/secClassRoom/event/eventQDQT`,
            method: 'POST',
            data: { "params": { "userName": getApp().data.userName, "sessionId": getApp().data.sessionId, "orderId": orderId, "state": state, "eventId": eventId, "lat": latitude, "log": longitude } },
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
              console.log(res.data)
              if (res.data.resultCode == '0001') {
               wx.showModal({
                title: '签到提示',
                content: '签到地点不在范围以内，请重试',
                success: function (res) {
                 if (res.confirm) {
                  console.log('用户点击确定')
                 }
                }
               })
              } else {
               wx.showModal({
                title: '签到提示',
                content: '签到成功！',
                success: function (res) {
                 if (res.confirm) {
                  console.log('用户点击确定')
                  wx.redirectTo({
                   url: '../hdqd/hdqd',
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
          } else {
           wx.showModal({
            title: '签到提示',
            content: '签到失败！',
            success: function (res) {
             if (res.confirm) {
              console.log('用户点击确定')
             }
            }
           })
          }
         }
        })
       } else if (res.cancel) {
        wx.showModal({
         title: '扫码提示',
         content: '扫码失败',
        })
       }
      }
     })
    }
   }
  })
 },
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
  let that = this;
  // 加载活动签到列表
  wx.request({
   url: `${getApp().data.url}business/secClassRoom/event/eventQDQTListQry`,
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
     console.log(res.data.object.list)
     that.setData({
      hdlist: res.data.object.list,
      hdlistLength: res.data.object.list.length
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