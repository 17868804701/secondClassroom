// pages/xfshInfo/xfshInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad& imgtype=jpg & er=1 & src=http % 3A% 2F% 2Fpic.58pic.com % 2F58pic% 2F12% 2F74% 2F05% 2F99C58PICYck.jpg']  
           
  },
  open_file:function(){
    wx.downloadFile({
      url: 'http://jw.eurasia.edu/res_base/jwc_com_www/upload/article/file/2011_2/5_20/pntegnwd9vnv.doc',
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },
  show_img: function () {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: this.data.image, // 需要预览的图片http链接列表,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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