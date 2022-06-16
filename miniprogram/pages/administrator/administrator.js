// pages/administrator/administrator.js
var app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    volunteer: true,
    transfer: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  change_volunteer() {
    var that = this
    var volunteer = this.data.volunteer
    var transfer = this.data.transfer
    if (volunteer) {
      wx.cloud.callFunction({
        name: 'update',
        data: {
          collection: 'Function',
          volunteer: false,
          transfer: transfer
        },
        success: function (res) {
          that.setData({
            volunteer: false
          })
          console.log('volunteer is false')
          app.globalData.volunteer = false
        }
      })
    } else {
      wx.cloud.callFunction({
        name: 'update',
        data: {
          collection: 'Function',
          volunteer: true,
          transfer: transfer
        },
        success: function (res) {
          that.setData({
            volunteer: true
          })
          console.log('volunteer is true')
          app.globalData.volunteer = true
        }
      })
    }

  },
  change_transfer() {
    var that = this
    var volunteer = this.data.volunteer
    var transfer = this.data.transfer
    if (transfer) {
      wx.cloud.callFunction({
        name: 'update',
        data: {
          collection: 'Function',
          volunteer: volunteer,
          transfer: false
        },
        success: function (res) {
          that.setData({
            transfer: false
          })
          app.globalData.transfer = false
        }
      })
    } else {
      wx.cloud.callFunction({
        name: 'update',
        data: {
          collection: 'Function',
          volunteer: volunteer,
          transfer: true
        },
        success: function (res) {
          that.setData({
            transfer: true
          })
          app.globalData.transfer = true
        }
      })
    }

  },
  releaseNews() {
    wx.navigateTo({
      url: '/pages/releaseNews/releaseNews',
    })
  },
  releaseActivity() {
    wx.navigateTo({
      url: '/pages/releaseActivity/releaseActivity',
    })
  },
  recruitVolunteers() {
    wx.navigateTo({
      url: '/pages/recruitVolunteers/recruitVolunteers',
    })
  },
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'GetNews',
      data: {
        collection: 'Function',
      },
      complete: res => {
        // console.log('callFunction test result: ', res.result.data.arr[0])
        this.setData({
          volunteer: res.result.data.arr[0].volunteer,
          transfer: res.result.data.arr[0].transfer
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