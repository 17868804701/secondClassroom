// pages/xfsqck/xfsqck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderId = options.orderId
    let processId = options.processId
    let realname = getApp().data.realname
    this.setData({
      realname: realname
    })
    let that = this;
    wx.request({
      url: `${getApp().data.url}business/secClassRoom/approveQry`,
      method: 'POST',
      data: {
        "params": {
          "userName": getApp().data.userName,
          "sessionId": getApp().data.sessionId,
          "processId": processId, 
          "orderId": orderId
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
         
          let length = parseInt(res.data.object.hisTasks.length);
         
          that.setData({
            list: res.data.object.hisTasks,
            listLength:length
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