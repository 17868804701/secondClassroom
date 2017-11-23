// pages/yuyueck/yuyueck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgLeft: "#01b8ab",
    cLeft: "white",
    bLeft: '#01b8ab',
    bgRight: "white",
    cRight: "#333",
    bRight: "gainsboro",
    L: "",
    R: "none",
    icon_url: "../images/down.png",
    activity_hide: "none",
    status: '1'
  },



  activity: function (e) {
    var id = e.currentTarget.id;
    let index = e.currentTarget.dataset.index;
    let list = this.data.fylist;
    for (var i = 0, len = list.length; i < len; ++i) {
      console.log(list[i].operateTime)
      if (list[i].operateTime == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      fylist: list
    });
  },


  activity1: function (e) {
    var id = e.currentTarget.id;
    let index = e.currentTarget.dataset.index;
    let list = this.data.xsclist;
    for (var i = 0, len = list.length; i < len; ++i) {
      console.log(list[i].operateTime)
      if (list[i].operateTime == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      xsclist: list
    });
  },







  left: function () {
    this.setData({
      bgRight: "white",
      cRight: "#333",
      bRight: "gainsboro",
      R: 'none',
      L: '',
      bgLeft: "#01b8ab",
      cLeft: "white",
      bLeft: '#01b8ab',
    })
  },
  right: function () {
    this.setData({
      bgRight: "#01b8ab",
      cRight: "white",
      bRight: '#01b8ab',
      R: '',
      L: 'none',
      bgLeft: "white",
      cLeft: "#333",
      bLeft: "gainsboro"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: `${getApp().data.url}business/secClassRoom/event/clsEndXfListQry`,
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
        } else {
          console.log(res.data.object.fylist)
          that.setData({
            xsclist: res.data.object.xsclist,
            fylist: res.data.object.fylist,
            xsclistLength: res.data.object.xsclist.length,
            fylistLength: res.data.object.fylist.length
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