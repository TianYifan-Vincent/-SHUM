// pages/reservation/reservation.js
// pages/all_show/all_show.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1'],
    show_info: [],
    pageNumber: 0,
    loadMore: false,
    currentDate: new Date().getTime(),
    loadAll: false,
    delID: '',
    admin: false,
    empty:false,//正在开展的活动是否为空
  },
  print(e) {
    console.log(e)
  },
  to_activityList(e) {
    console.log('this is', e)
    var title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '/pages/activityList/activityList?title=' + title,
    })
  },
  signUp(e) {
    console.log('sign', e.currentTarget.dataset.title)
    var title = e.currentTarget.dataset.title
    var signed = app.globalData.signed
    if (!signed) {
      wx.showModal({
        title: '请登录后报名',
        confirmText: '前往登录',
        // content: '这是一个模态弹窗',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/personal_center/personal_center',
            })
            console.log('用户点击确定')
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/signUp/signUp?title=' + title,
      })
    }
  },

  getNextPage() {
    var page = this.data.pageNumber + 1
    this.setData({
      loadMore: true,
      loadAll: false
    })
    wx.cloud.callFunction({
      name: 'GetNews',
      data: {
        // collection:'event',
        collection: 'activityIdeal',
        page: page
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        var more = this.data.show_info
        more = more.concat(res.result.data.arr)
        this.setData({
          loadMore: false,
          loadAll: false,
          pageNumber: page,
          show_info: more
        })
        console.log(this.data.show_info)
      }
    })
  },
  getFirstPage() {
    var that = this
    var page = this.data.pageNumber
    var currentDate = this.data.currentDate
    this.setData({
      loadMore: true,
      loadAll: false,
    })
    wx.cloud.callFunction({
      name: 'GetNews',
      data: {
        // collection:'event',
        collection: 'activityIdeal',
        page: page
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        this.setData({
          loadMore: false,
          loadAll: false,
          show_info: res.result.data.arr
        })
        console.log(this.data.show_info)
        console.log('arr:', this.data.show_info)
        var info = this.data.show_info
        console.log(currentDate)
        if(info[0].upLoadTime < currentDate)
        {
          this.setData({
                  empty:true
                })
        }
        // for(var i=0;i<info.length;i++)
        // {
        //   console.log(1654607400000 >= currentDate)
        //   if(info[i].upLoadTime >= currentDate )
        //   {
        //     this.setData({
        //       empty:false
        //     })
        //     break
        //   }
        //   else{
        //     this.setData({
        //       empty:false
        //     })
        //   }
        // }
        console.log(that.data.empty)
      }
    })
  },
  show_news(e) {
    // console.log(e.currentTarget.dataset)

    var id = e.currentTarget.dataset.id
    var content = e.currentTarget.dataset.content
    wx.redirectTo({
      url: '/pages/show_news/show_news?newsID=' + id + '&content=' + content,
    })
  },
  to_detail(e) {
    console.log('wanna:', e.currentTarget.dataset)
    var id = e.currentTarget.dataset.id
    var content = e.currentTarget.dataset.content
    var mydic = {
      'id':e.currentTarget.dataset.id,
      'url': e.currentTarget.dataset.url,
      'title': e.currentTarget.dataset.title,
      'content': e.currentTarget.dataset.content,
      'signUp': e.currentTarget.dataset.signup,
      'members': e.currentTarget.dataset.members,
      'time': e.currentTarget.dataset.time,
      'duration': e.currentTarget.dataset.duration,
      'uploadtime': e.currentTarget.dataset.uploadtime,
      'location':e.currentTarget.dataset.location
    }
    console.log(mydic)
    mydic = JSON.stringify(mydic)
    // var url = e.currentTarget.dataset.
    wx.navigateTo({
      // url: '/pages/reservation_detail/reservation_detail?eventID=' + id + '&content=' + content + '&mydic=' + mydic,
      url: '/pages/reservation_detail/reservation_detail?mydic=' + mydic,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var admin = app.globalData.admin
    console.log('Onload')
    // console.log(options.delID)
    this.setData({
      // delID:options.delID,
      admin: admin
    })
    this.getFirstPage()
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
    // var id=this.data.delID
    // console.log('delID',id)

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
    var that = this
    // console.log(that.data.loadMore)
    if (!that.data.loadMore) {
      wx.showToast({
        title: '到底啦',
        icon: 'none',
        duration: 2000
      })
      that.setData({
        loadMore: true, //加载中
        loadAll: false
      })
      setTimeout(function () {
        that.getNextPage()
        wx.hideLoading()
      }, 2000)
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})