// pages/to_all/to_all.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    on_show:[],
    pageNumber:0,
    loadMore:false,
    loadAll:false,
    latestName:"",
    past_show:[],
    show:false,
    all: false,
    firstall: false
  },
  getNextPage(){
    var page=this.data.pageNumber+1
    this.setData({
      loadMore:true,
      loadAll:false,
      show: false
    })
    wx.cloud.callFunction({
      name: 'GetNews',
      data:{
        // collection:'event',
        collection:'exhibitions',
        page:page
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        var more=this.data.past_show
        more=more.concat(res.result.data.arr)
        if (res.result.data.arr.length < 6) {
          this.setData({
            all: true,
          })
        }
        this.setData({
          loadMore:false,
          loadAll:false,
          pageNumber:page,
          past_show:more
        })
        console.log(this.data.past_show)
      }
    })
  },
  // getFirstPage(){
  //   var latestName=this.data.latestName
  //   var page=this.data.pageNumber
  //   this.setData({
  //     loadMore:true,
  //     loadAll:false,
  //     show: false
  //   })
  //   wx.cloud.callFunction({
  //     name: 'GetNews',
  //     data:{
  //       collection:'exhibitions',
  //       page:0
  //     },
  //     complete: res => {
  //       console.log('callFunction test result: ', res)
  //       var more=this.data.on_show
  //       more=more.concat(res.result.data.arr)
  //       console.log(more)
  //       for(var i=0;i<more.length;i++){
  //         if (more[i].name==latestName){
  //           this.setData({
  //             on_show:[more[i]]

  //           })
  //           console.log(this.data.on_show)

  //         }
  //         this.setData({
  //           loadMore:false,
  //           loadAll:false,
  //           past_show:more
              
  //           })
  //       }
  //     }
  //   })
  // },
  getFirstPage(){
    var latestName=this.data.latestName
    var page=this.data.pageNumber
    this.setData({
      loadMore:true,
      loadAll:false,
      show: false
    })
    wx.cloud.callFunction({
      name: 'GetNews',
      data:{
        collection:'exhibitions',
        page:0
      },
      complete: res => {
        console.log(res.result.data.arr)
        this.setData({
          loadMore: false,
          loadAll: false,
          show: true,
          past_show: res.result.data.arr
        })
        setTimeout(function () {
          this.setData({
            loading: false,
          });
        }.bind(this), 3000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      latestName:e.latestName
    })
    this.getFirstPage()
    
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
  loadImages: function () {
    if (!this.data.all) {
      wx.showLoading({
        title: '加载中',
      })
      // console.log("到底了")
      var that = this
      if (!that.data.loadMore) {
        that.setData({
          loadMore: true,//加载中
          loadAll: false
        })
        setTimeout(function () {
          that.getNextPage()
          wx.hideLoading()

        }, 2000)

      }


    }
    else if (!this.data.firstall) {
      this.setData({
        firstall: true,
      })
      wx.showToast({
        title: '已无更多',
        icon: 'success',
        duration: 2000,

      })

    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  this.loadImages()
  // wx.showLoading({
  //   title: '加载中',
  // })
  // console.log("到底了")
  // var that=this
  // if(!that.data.loadMore){
  //   that.setData({
  //     loadMore:true,//加载中
  //     loadAll:false
  //   })
  //   setTimeout(function(){
  //     that.getNextPage()
  //     wx.hideLoading()
  //   },2000)
  // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})