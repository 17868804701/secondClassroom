// pages/hdshInfo/hdshInfo.js
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
    let userName = getApp().data.userName
    let createtime = options.createtime
    let creator = options.creator
    let jbname = options.jbname
    let mkname = options.mkname
    let startxf = options.startxf
    let xmname = options.xmname
    let orderid = options.orderid
    let evenname = options.evenname
    console.log(options)
    this.setData({
      createtime: createtime,
      creator: creator,
      jbname: jbname,
      mkname: mkname,
      startxf: startxf,
      xmname: xmname,
      orderid: orderid,
      username: userName,
      evenname: evenname
    })
  },
  radioChange: function (e) {
 
    this.setData({
      radioValue: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
 
    this.setData({
      textareaValue: e.detail.value
    })
  },
  tijiao: function () {
    console.log(getApp().data.sessionId)
    console.log(getApp().data.userName)
    console.log(this.data.orderid)
    console.log(this.data.radioValue)
    console.log(this.data.textareaValue)
    if (this.data.radioValue == undefined) {
      wx.showModal({
        title: '提示',
        content: '请选择审核状态',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      let that = this;
      wx.request({
        url: `${getApp().data.url}business/common/approve`,
        method: 'POST',
        data:
        {
          "params": {
            "sessionId": getApp().data.sessionId,
            "userName": getApp().data.userName,
            "orderId": this.data.orderid,
            "result": this.data.radioValue,
            "suggest": this.data.textareaValue||"审核"
          }
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          console.log("*******************************活动审核*************************************")
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
            console.log(res.data);
            wx.showToast({
              title: '审核成功',
            })
            wx.redirectTo({
              url: '../hdsh/hdsh',
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