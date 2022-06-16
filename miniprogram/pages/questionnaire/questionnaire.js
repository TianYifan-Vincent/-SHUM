// pages/questionnaire/questionnaire.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom:true,
    all_list:'',//当前的数据长度
  },
  gotoquestionnaire:function(){
    wx.navigateTo({
      url: '/pages/showquest/showquest',
    })
  }
})