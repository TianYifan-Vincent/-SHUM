// pages/myActivity/myActivity.js
const db = wx.cloud.database()
const _ = db.command
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    userInfo: {},
    activity:[],
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  to_detail(e) {
    console.log('wanna:', e.currentTarget.dataset)
    var id = e.currentTarget.dataset.id
    var content = e.currentTarget.dataset.content
    var dic = {
      'id': e.currentTarget.dataset.id,
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
    dic = JSON.stringify(dic)
    // var url = e.currentTarget.dataset.
    wx.navigateTo({
      url: '/pages/reservation_detail/reservation_detail?eventID=' + id + '&content=' + content + '&mydic=' + dic,
    })
  },
  onLoad: function () {
    this.setData({
      id: app.globalData.ID
    }) 
    console.log(this.data.id)
    var that = this
    var promiseArr = []
    db.collection('user').where({
        _openid: app.globalData.ID,
      })
      .get({
        success: function (res) {
          // console.log('用户信息', res.data[0])
          if (res.data.length > 0) {
            that.setData({
              userInfo: res.data[0],
            })
            var list = that.data.userInfo.activity
            list = list.reverse()
            console.log(list)
            var activity=[]
            for (let index = 0; index < list.length; index++) {
              let promise = new Promise((resolve, reject) => {
                db.collection('activityIdeal').where({
                    title: list[index]
                  })
                  .get({
                    success: function (res) {
                      // res.data 是包含以上定义的两条记录的数组
                      console.log(res.data)
                      if(res.data[0]){
                        activity.push(res.data[0])
                      }
                      resolve(res)
                    },
                    fail: function (error) {
                      reject(error)
                    }, 
                    complete: function (res) {

                    },
                  })
              });
              promiseArr.push(promise)
            }
            Promise.all(promiseArr).then((res) => {
              // console.log('?',res)
              console.log('promise', activity)
              var sortedAC = []
              for(let i=0;i<list.length;i++){
                for(let j=0;j<activity.length;j++)
                {
                  if(list[i]==activity[j].title){
                    sortedAC.push(activity[j])
                  }
                }
              }
              that.setData({
                activity: sortedAC
              })
              console.log(that.data.activity)
            })
          }

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
    this.onLoad()
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