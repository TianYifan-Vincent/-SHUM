// pages/signUp/signUp.js
var app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    activity: [],
    signed: -1,
    name: '',
    studentID: '',
    phonenumber: '',
    email: '',
    userInfo: {},
    existed: false,
  },
  submit() {

    var that = this
    // console.log('奇怪',ID)
    var ID = app.globalData.ID
    var existed = that.data.existed
    var name = that.data.name
    var studentID = that.data.studentID
    var phonenumber = that.data.phonenumber
    var email = that.data.email
    // 用户信息是否存在，已经存在考虑将活动拼接进去
    if (existed) {
      console.log('用户信息存在')
      // 存在，考察是否已经报名
      var userInfo = that.data.userInfo
      var t = that.data.title
      var activity = userInfo.activity
      var doc = userInfo._id
      let index
      for (index = 0; index < activity.length; index++) {
        console.log(index, activity[index])
        if (activity[index] == t) {
          that.setData({
            signed: 1
          })
          break
        }
      }
      var signed = that.data.signed
      if(signed!=1)
      {
        that.setData({
          signed: 0
        })
      }
      // 如果报过名
      if (signed) {
        wx.showToast({
          title: '请勿重复报名',
          icon: 'error',
          duration: 2000
        })

      } //没报过名
      else {
        if (name == '') {
          wx.showToast({
            title: '姓名不能为空',
            icon: 'loading',
            duration: 1500
          })
        } else if (studentID == '') {
          wx.showToast({
            title: '学号不能为空',
            icon: 'loading',
            duration: 1500
          })
        } else if (phonenumber == '') {
          wx.showToast({
            title: '电话不能为空',
            icon: 'loading',
            duration: 1500
          })
        } else {
          if (email == '') {
            wx.showToast({
              title: '邮箱不能为空',
              icon: 'loading',
              duration: 1500
            })
          } else {
            var activity = userInfo.activity
            activity.push(t)
            console.log(activity)
            db.collection('user').doc(doc).update({
              // data 传入需要局部更新的数据
              data: {
                // 表示将 done 字段置为 true
                activity: activity,
              },
              success: function (res) {
                console.log("更新成功")
                that.setData({
                  existed: true,
                  sighed: true
                })
                wx.showToast({
                  title: '报名成功',
                  icon: 'success',
                  duration: 2000,
                  success: res => {
                    for(var t = Date.now();Date.now() - t <= 2000;);
                    wx.navigateBack({
                      delta: 1,
                    })
                  }
                })
                console.log(that.data.existed)
              }
            })
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'activityIdeal',
                title: t,
                ID: ID,
                flag: 1
              }
            })
          }
        }


      }
    } else {
      if (name == '') {
        wx.showToast({
          title: '姓名不能为空',
          icon: 'loading',
          duration: 1500
        })
      } else if (studentID == '') {
        wx.showToast({
          title: '学号不能为空',
          icon: 'loading',
          duration: 1500
        })
      } else if (phonenumber == '') {
        wx.showToast({
          title: '电话不能为空',
          icon: 'loading',
          duration: 1500
        })
      } else {
        console.log("用户信息不存在")
        var activity = that.data.activity
        var t = that.data.title
        activity.push(t)
        wx.cloud.callFunction({
          name: 'update',
          data: {
            collection: 'activityIdeal',
            title: t,
            ID: ID,
            flag: 1
          }
        })
        db.collection("user").add({
          data: {
            // openid
            ID: ID,
            activity: activity,
            name: this.data.name,
            studentID: this.data.studentID,
            phonenumber: this.data.phonenumber,
            email: this.data.email
          }
        }).then(res => {
          that.setData({
            existed: true,
            signed: 1
          })
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 2000,
            success: res => {
              for(var t = Date.now();Date.now() - t <= 2000;);
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        })
      }

    }
  },
  clearAll() {
    this.setData({
      name: '',
      studentID: '',
      phonenumber: '',
      email: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  cancel() {
    var that = this
    console.log('canceling...')
    var userInfo = that.data.userInfo
    var t = that.data.title
    var activity = userInfo.activity
    var doc = userInfo._id
    var ID = app.globalData.ID
    activity.pop()
    console.log(activity)
    wx.cloud.callFunction({
      name: 'update',
      data: {
        collection: 'activityIdeal',
        title: t,
        ID: ID,
        flag: -1
      }
    })
    db.collection('user').doc(doc).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        activity: activity,
      },
      success: function (res) {
        console.log("更新成功")
        that.setData({
          existed: true,
          sighed: true
        })
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 2000,
          success: res => {
            that.setData({
              signed:0
            })
            for(var t = Date.now();Date.now() - t <= 2000;);
            wx.navigateBack({
              delta: 1,
            })
          }
        })
        // console.log(that.data.existed)
      }
    })
    
  },
  onLoad: function (options) {
    console.log(options)
    var that = this
    var title = options.title
    console.log(that.data.signed)
    this.setData({
      title: title
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
    var ID = app.globalData.ID
    var that = this
    console.log(ID, app.globalData.ID)
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
              userInfo: res.data[0],
              existed: true
            })
            var userInfo = that.data.userInfo
            var t = that.data.title
            var activity = userInfo.activity
            var doc = userInfo._id
            let index
            for (index = 0; index < activity.length; index++) {
              console.log(index, activity[index])
              if (activity[index] == t) {
                that.setData({
                  signed: 1
                })
                break
              }
            }
            var signed = that.data.signed
            if(signed!=1){
              that.setData({
                signed: 0
              })
            }
          }
          // console.log('?????')
          console.log(that.data.existed)
          console.log(that.data.signed)
        }
      })
    var existed = that.data.existed
    if (existed) {
      console.log('用户信息存在')
      // 存在，考察是否已经报名

    }
    // console.log(that.data.signed)
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