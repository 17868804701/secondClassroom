// pages/apply_xfList/apply_xfList.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // sqListLength:"0"
  },
  xfsqck: function (e) {
    let orderId = e.currentTarget.dataset.orderid;
    let processId = e.currentTarget.dataset.processid;
    console.log(orderId)
    console.log(processId)
    wx.navigateTo({
      url: `../xfsqck/xfsqck?orderId=${orderId}&&processId=${processId}`,
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: `${getApp().data.url}business/common/studentSQList`,
      method: 'POST',
      data: {
        "params": {
          "userName": getApp().data.userName,
          "sessionId": getApp().data.sessionId,
          "type": "secClassRoom"
        }
      },
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
        } else {
          that.setData({
            // endList: res.data.object.endlist,
            // endListLength: res.data.object.endlist.length,
           sqList: res.data.object.clsRoomList,
           sqListLength: res.data.object.clsRoomList.length,
          })
        }
      }
      ,
      fail: function (err) {
        console.log(err)
      },
      complete: function (data) {
    
      }
    }),
     wx.request({
     url: `${getApp().data.url}business/common/endOrderList`,
      method: 'POST',
      data: {
       "params": {
        "userName": getApp().data.userName,
        "sessionId": getApp().data.sessionId,
        "type": "secClassRoom",
        "creator": getApp().data.userName
       }
      },
      header: {
       "Content-Type": "application/json"
      },
      success: function (res) {
       console.log(res.data)
       console.log(222)
       // console.log(res.data.object.endlist.evenName)
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
       } else {
        that.setData({
         endList: res.data.object.clsRoomList,
         endListLength: res.data.object.clsRoomList.length,
         // sqList: res.data.object.clsRoomList,
         // sqListLength: res.data.object.clsRoomList.length,
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