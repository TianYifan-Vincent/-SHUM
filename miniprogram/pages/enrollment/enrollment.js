// pages/enrollment/enrollment.js
const db = wx.cloud.database()
var app = getApp()
Page({
  data: {
    isable: 0,
    volunteer:true,
    adminlist:[],
  },
  getUserProfile(e) {
    var that = this
    var adminlist = that.data.adminlist
    wx.getUserProfile({
      desc: '用于活动报名、身份认证',
      success: (res) => {
        app.globalData.signed = true
        wx.cloud.callFunction({
          name: 'helloCloud',
          data: {
            message: 'helloCloud',
          }
        }).then(res => {
          console.log(res)
          this.setData({
            userId: res.result.OPENID
          })
          
          app.globalData.ID = this.data.userId
          console.log(that.data.userId)
          var userId = that.data.userId
          var admin = that.data.administator
          for (var i = 0; i < adminlist.length; i++) {
            if (userId == adminlist[i].id) {
              that.setData({
                admin: true
              })
              app.globalData.admin = true
              console.log('global', app.globalData.admin)
            }
          }
          console.log('userid:', userId, 'is admin')

        })
        this.setData({
          userInfo: res.userInfo,
          logIn: true
        })
        app.globalData.userInfo = res.userInfo
        wx.navigateTo({
          url: '/pages/application/application',
        })
      }
    })
  },
  //跳转详情页
  gotoDetail: function () {
    // wx.navigateTo({
    //   url: '/pages/application/application',
    // })
    var volunteer = this.data.volunteer
    if(volunteer){
      // 如果功能开放
      if (app.globalData.signed) {
      wx.navigateTo({
        url: '/pages/application/application',
      })
    }else{
      this.getUserProfile()
    }
    }
    else{
      wx.showModal({
        title: '尚未开放',
        showCancel:false,
        success (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } 
        }
      })
    }
     
  },
  onLoad: function (options) {
    var that = this
    var volunteer = app.globalData.volunteer
    this.setData({
      volunteer:volunteer
    })
    wx.getSetting({
      withSubscriptions: ({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {}
            })
          } else {
            that.setData({
              logIn: false
            })
          }
        }
      }),
    })
    wx.cloud.callFunction({
      name: 'GetNews',
      data: {
        collection: 'administrator',
      },
      complete: res => {
        console.log('callFunction test result: ', res.result.data)
        this.setData({
          adminlist: res.result.data
        })
      }
    })
  },
  onShow: function () {
    // const that = this;
    // db.collection('Function').doc('6d85a2b962668dc600355ebe2c824397').get().then(res => {
    //   // res.data 包含该记录的数据
    //   // console.log(res.data)
    //   that.setData({
    //     isable:res.data.Volunteer
    //   })
    // })
    
    
  }
})