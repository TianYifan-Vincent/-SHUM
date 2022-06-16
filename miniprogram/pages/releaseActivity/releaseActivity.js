// pages/releaseNews/releaseNews.js
var filePath = [];
var pUrl = [];
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2100, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    title: '',
    link: '',
    members: '',
    sTime: '',
    finish: 0,
    duration: '',
    signUp: 0,
    signed: {},
    content: '',
    time: '',
    location: '',
    pictureArr: [],
    pUrl: [],
    // currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },

  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  formReset(e) {
    var that = this
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: '',
    })
  },
  btnSub(res) {
    var that = this
    var promiseArr = []
    var title = that.data.title
    var duration = that.data.duration
    var content = that.data.content
    var members = that.data.members
    var location = that.data.location
    var pictureArr = that.data.pictureArr
    if (title == '') {
      wx.showToast({
        title: '活动名称不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (members == '') {
      wx.showToast({
        title: '活动名额不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (Number(members) <= 0) {
      wx.showToast({
        title: '名额不能≤0',
        icon: 'loading',
        duration: 1500
      })
    } else if (duration == '') {
      wx.showToast({
        title: '活动时长不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (Number(duration) <= 0) {
      wx.showToast({
        title: '时长不能≤0',
        icon: 'loading',
        duration: 1500
      })
    } else if (location == '') {
      wx.showToast({
        title: '活动地点不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (content == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'loading',
        duration: 1500
      })

    } else if (pictureArr.length == 0) {
      wx.showToast({
        title: '图片不能为空',
        icon: 'loading',
        duration: 1500
      })

    } else {
      wx.showModal({
        title: '确认提交',
        // content: '这是一个模态弹窗',
        success(res) {
          if (res.confirm) {
            for (let i = 0; i < filePath.length; i++) {
              let promise = new Promise((resolve, reject) => {
                var filename = Date.now() + "_" + i
                wx.cloud.uploadFile({
                  cloudPath: filename + '.jpg',
                  filePath: filePath[i],
                  success: function (res) {
                    console.log('success', res)
                    pUrl.push(res.fileID)
                    resolve(res);
                  },
                  fail: function (error) {
                    reject(error);
                  },
                  complete: function (res) {

                  },
                })
              });
              promiseArr.push(promise)
            }
            Promise.all(promiseArr).then((res) => {
              console.log('pUrl', pUrl)
              that.addLines()
            })
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }


  },

  addLines() {
    var time = this.formatDate(this.data.currentDate)
    db.collection("activityIdeal").add({
      data: {
        title: this.data.title,
        time: time,
        upLoadTime: this.data.currentDate,
        duration: this.data.duration,
        content: this.data.content,
        finish: this.data.finish,
        members: Number(this.data.members),
        signUp: this.data.signUp,
        location:this.data.location,
        fileID: pUrl
      }
    }).then(res => {

      wx.hideLoading({
        success: (res) => {
          console.log("发布成功", res)
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1500
          })
        },
      })
    })
  },
  clickBtn() {
    // 产生照片的临时路径
    wx.chooseImage({
      success: res => {
        console.log("临时路径", res)
        filePath = res.tempFilePaths
        this.setData({
          // 存放临时路径
          pictureArr: filePath
        })
      }
    })

  },
  clearAll() {
    filePath = []
    pUrl = []
    this.setData({
      pictureArr: [],
      title: '',
      time: '',
      content: '',
      duration: '',
      members: '',
      location:''
    })
  },
  formatDate(event) {
    console.log(event)
    var date = new Date(event);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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