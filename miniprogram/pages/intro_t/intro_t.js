//获取应用实例
var app = getApp();
Page({
  data: {},
  //跳转详情页
  gotoDetail: function () {
    wx.navigateTo({
      url: '/pages/suyuan/suyuan',
    })
  }
});

