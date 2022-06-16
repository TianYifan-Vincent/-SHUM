// pages/show_news/show_news.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link:'',
    newsID: "",
    content: "",
    admin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  goBack() {
    wx.redirectTo({
      url: '/pages/all_show/all_show',
    })
  },
  delNews() {
    var that=this
    wx.showModal({
      title: '确认删除',
      // content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          
          var id = that.data.newsID
          wx.cloud.callFunction({
            name: 'myDelete',
            data: {
              name: 'newsletter',
              id: id
            },
          }).then(res => {
            console.log('删除成功')
            wx.redirectTo({
              url: '/pages/all_show/all_show',
            })
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


    // var id = this.data.newsID
    // wx.cloud.callFunction({
    //   name: 'myDelete',
    //   data: {
    //     name: 'newsletter',
    //     id: id
    //   },
    // }).then(res => {
    //   console.log('删除成功')
    //   wx.redirectTo({
    //     url: '/pages/all_show/all_show',
    //   })
    // })
  },
  onLoad: function (options) {
    this.setData({
      link:options.link
    })
    // if (app.globalData.admin == true) {
    //   this.setData({
    //     admin: true
    //   })
    // }
    // console.log(options)
    // this.setData({
    //   newsID: options.newsID,
    //   content: options.content
    // })
    // console.log("这是id：", this.data.newsID)
    // console.log("这是内容：", this.data.content)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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