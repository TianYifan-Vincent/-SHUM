// pages/all_show/all_show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_info:[],
    pageNumber:0,
    loadMore:false,
    loadAll:false,
    delID:''
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
        collection:'newsIdeal',
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
        collection:'newsIdeal',
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
  show_news(e){
    // console.log(e.currentTarget.dataset)
    var link=e.currentTarget.dataset.url
    wx.navigateTo({
      url: '/pages/show_news/show_news?link='+link,
    })
    // var id=e.currentTarget.dataset.id
    // var content=e.currentTarget.dataset.content
    // wx.redirectTo({
    //   url: '/pages/show_news/show_news?newsID='+id+'&content='+content,
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('Onload')
    console.log(options.delID)
    this.setData({
      delID:options.delID
    })
    // var id=this.data.delID
    // var arr=this.data.show_info
    // if(id!="")
    // {
    //   for(var i=0;i<length(arr);i++)
    //   {
    //     if(arr[i]._id==id)
    //     {
    //       console.log('finded!')
    //       this.setData({
    //         delID:''
    //       })
    //     }
    //   }
    // }
    this.getFirstPage()
    console.log('arr:',this.data.show_info)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')
    var id=this.data.delID
    console.log('delID',id)
    
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
    wx.showLoading({
      title: '加载中',
    })
    console.log("到底了")
    var that=this
    if(!that.data.loadMore){
      that.setData({
        loadMore:true,//加载中
        loadAll:false
      })
      setTimeout(function(){
        that.getNextPage()
        wx.hideLoading()
      },2000)
    }
    
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})