// pages/reservation_detail/reservation_detail.js
var app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventID: '',
    content: '',
    mydic: {},
    admin: false,
    adminlist: [],
    currentDate: new Date().getTime(),
    userId: '',
    userInfo: {},
    existed:-1,
  },
  delNews() {
    var that = this
    wx.showModal({
      title: '确认删除',
      // content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {

          var id = that.data.newsID
          wx.cloud.callFunction({
            name: 'myDelete',
            data: {
              name: 'event',
              id: id
            },
          }).then(res => {
            console.log('删除成功')
            wx.redirectTo({
              url: '/pages/reservation/reservation',
            })
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  signUp(e) {
    console.log('sign', e.currentTarget.dataset.title)
    var title = e.currentTarget.dataset.title
    var signed = app.globalData.signed
    var that = this
    if (!signed) {
      that.getUserProfile().then(res => {
        console.log(res)
        if (res) {
          var title = that.data.mydic.title
          wx.navigateTo({
            url: '/pages/signUp/signUp?title=' + title,
          })
        }
      })

      // wx.showModal({
      //   title: '请登录后报名',
      //   confirmText:'前往登录',
      //   success (res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //     } 
      //   }
      // })

    } else {
      wx.navigateTo({
        url: '/pages/signUp/signUp?title=' + title,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  cancel(){}
  ,
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
  onLoad: function (options) {
    var that = this
    // console.log(options)
    // var string = options.mydic
    var mydic = JSON.parse(options.mydic)
    that.setData({
      mydic: mydic
    })
    // console.log(mydic)
    // console.log(this.data.mydic.uploadtime,this.data.currentDate)
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
    var dic = this.data.mydic
    var that = this
    var ID = app.globalData.ID
    console.log(ID,app.globalData.ID)
    db.collection('user').where({
      _openid: ID,
    })
    .get({
      success: function (res) {
        console.log('用户信息', res.data)
        // console.log('?????')
        // console.log('用户信息', res.data[0])
        if (res.data.length > 0) {
          console.log('?????')
          that.setData({
            // userInfo: res.data[0],
            existed: 1
          })
        }else{
          that.setData({
            // userInfo: res.data[0],
            existed: 0
          })
        }
        // console.log('?????')
        console.log(that.data.existed)
      }
    })
    console.log(dic.id)
    wx.cloud.callFunction({
      name: 'GetNews',
      data: {
        collection: 'activityIdeal',
        id: dic.id
      },
      complete: res => {
        console.log('callFunction test result: ', res.result.data.arr)
        var arr = res.result.data.arr
        var dic = that.data.mydic
        dic.signUp = arr.signUp
        console.log(dic)

        that.setData({
          mydic: dic
        })
      }
    })
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