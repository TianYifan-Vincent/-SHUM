// pages/myvol/myvol.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: '', 
    myopenid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.cloud.callFunction({
      name: 'helloCloud',
      data: {
        message: 'helloCloud',
      }
    }).then(res => {
      console.log(res.result.OPENID)//res将appid和openid返回
      var openid=res.result.OPENID
      this.setData({
        myopenid: openid
      })
      const db = wx.cloud.database();
      db.collection('vol_info').where({
        _openid: this.data.myopenid
      })
        .get()
        .then(res => {
          console.log("获取志愿者openid成功")
          console.log(res.data)
          if(res.data[0])
          {
            if (res.data[0].flag=='待审核'){
              this.setData({
                flag: '待审核中'
              })
            }else if (res.data[0].flag=='已通过'){
              this.setData({
                flag: '审核通过'
              })
            }else{
              this.setData({
                flag: '审核未通过'
              })
            }
          }
          else{
            this.setData({
              flag: '尚未申请'
            })
          }
        })
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
    this.onLoad()
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