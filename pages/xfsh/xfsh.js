// pages/xfsh/xfsh.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // listLength:"0"
  },
  xfshInfo: function () {
    wx.navigateTo({
      url: '../xfshInfo/xfshInfo',
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
          "isEvent":"2"
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
        } else {
        
          that.setData({
            list: res.data.object.list,
            listLength: res.data.object.list.length
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