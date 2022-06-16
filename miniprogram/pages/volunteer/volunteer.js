// pages/volunteer/volunteer.js
Page({
  data: {},
  //跳转详情页
  gotoDetail: function () {
    wx.navigateTo({
      url: '/pages/enrollment/enrollment',
    })
    // wx.showModal({
    //   title: '该模块仍在开发中',
    //   showCancel:false,
    //   success (res) {
    //     if (res.confirm) {
    //       // console.log('用户点击确定')
    //     } 
    //   }
    // })
  }
})