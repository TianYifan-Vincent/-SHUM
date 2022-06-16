// pages/personal_center/personal_center.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logIn: false,
    userInfo: {},
    admin: false,
    appid: '',
    secret: '',
    js_code: '',
    grant_type: '',
    adminlist: [],
    administator: ['orP8-4xvI3yZIHyPn7CCFTR8WCVg', 'orP8-488Vhq32UYhjIZb7OUhlgGE', 'orP8-40GlAaGZe1ERy1hmh1QaU0k', 'orP8-45zZHXUKLp-Y9Ouwde3rdsg'],
    userId: '',
    'function_arr': [
      '参观须知', '我的活动预约', '我的志愿者', '联系我们', '调查问卷'
    ],
    functionButton: ['to_attention', 'to_myActivity', 'to_myVolunteer', 'to_contact', 'to_questionnaire'],
    'head_border': 'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/mypicture/a1.png?sign=8f25ebc0061157f914f39a2d123a6d7a&t=1639990358',
    'function_border': 'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/mypicture/Avatar_fun.png?sign=218f9438c96174c1a62f640a8106e1a2&t=1639990403',
    'split_line': 'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/mypicture/a_border.png?sign=e0ac954cd8a64ca0bb23c133993e9670&t=1639990429'
  },
  to_attention() {
    wx.navigateTo({
      url: '/pages/to_attention/to_attention'
    })
  },
  to_myActivity(e) { 
    var that = this
    if (app.globalData.signed) {
      console.log(e)
      var ID = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/myActivity/myActivity',
      })
    } else {
      that.getUserProfile()

    }
  },
  to_myVolunteer() {
    if (app.globalData.signed) {
      wx.navigateTo({
        url: '/pages/myvol/myvol',
      })
    } else {
      this.getUserProfile()
    }
  },
  to_contact() {
    wx.navigateTo({
      url: '/pages/to_contact/to_contact',
    })
  },
  to_questionnaire() {
    wx.navigateTo({
      url: '/pages/questionnaire/questionnaire',
    })
  },
  getUserProfile(e) {
    var that = this
    var adminlist = that.data.adminlist
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '用于活动报名、身份认证',
        success: (res) => {
          app.globalData.signed = true
          wx.cloud.callFunction({
            name: 'helloCloud',
            data: {
              message: 'helloCloud',
            },
            success: (res) => {
              console.log('step 1')
              app.globalData.ID = res.result.OPENID
              console.log(res)
              this.setData({
                userId: res.result.OPENID
              })
              console.log('step 2')
              console.log(app.globalData.ID)
              var userId = that.data.userId
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
              resolve(true)
            },
            fail: (err) => {
              reject(err)
            }
          })
          console.log('step 3')
          that.setData({
            userInfo: res.userInfo,
            logIn: true
          })
          console.log('step 4')
          console.log(res.userInfo)
          app.globalData.userInfo = res.userInfo
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  management() {
    wx.navigateTo({
      url: '/pages/administrator/administrator',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var admin = app.globalData.admin
    var signed = app.globalData.signed
    var userInfo = app.globalData.userInfo
    var id = app.globalData.ID
    console.log(admin)
    if(signed)
    {
      that.setData({
        userInfo:userInfo,
        admin:admin,
        logIn:true,
        userId:id
      })
    }
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