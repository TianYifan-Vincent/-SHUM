// pages/VRpanorama/VRpanorama.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_info:[],
    pageNumber:0,
    loadMore:false,
    loadAll:false,
    mydic:{},
    show: false,
    img_path:['https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/index_pic/longmen5.jpg?sign=99f2e45b997408d48c1a88ee9e23b8d2&t=1647447425','https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/index_pic/sanxingdui1.1.png?sign=1a8441fb84d8fdfb109876345fe9dd56&t=1647447498']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  attention(){
    wx.showToast({
      title: '点击下方推文，识别推文底部的二维码便可体验全景游览',
      icon: 'none',
      duration: 2000
    })
},
  getNextPage(){
    var page=this.data.pageNumber+1
    this.setData({
      loadMore:true,
      loadAll:false
    })
    wx.cloud.callFunction({
      name: 'GetNews',
      data:{
        collection:'VRpanorama',
        page:page
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        var more=this.data.show_info
        more=more.concat(res.result.data.arr)
        this.setData({
          loadMore:false,
          loadAll:false,
          pageNumber:page,
          show_info:more
        })
        console.log(this.data.show_info)
      }
    })
  },
  getFirstPage(){
    var page=this.data.pageNumber
    this.setData({
      loadMore:true,
      loadAll:false,
    })
    wx.cloud.callFunction({
      name: 'GetNews',
      data:{
        collection:'VRpanorama',
        page:page
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        this.setData({
          loadMore:false,
          loadAll:false,
          show_info:res.result.data.arr
        })
        console.log(this.data.show_info)
      }
    })
  },
  to_VRpanoramaDetail(e){
    console.log(e.currentTarget.dataset.url)
    var link=e.currentTarget.dataset.url
    wx.navigateTo({
      url: '/pages/VRpanoramaDetail/VRpanoramaDetail?link='+link,
    })
  },
  onLoad: function (options) {
    this.getFirstPage()
    console.log('arr:',this.data.show_info)
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