const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log('load!!!')
    const { name } = options;
    console.log(options)
    this.getData(name);
    console.log(this.data.details)
  },
  getData(name) {
    const that = this;
    db.collection("exhibition_detail").where({
      name: name
    })
      .get({
        success: function (res) {
          // 修改格式
          const [data] = res.data;
          // 使用that，否则不能给data赋值
          that.setData({
            details: data
          })
          // console.log(data);
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