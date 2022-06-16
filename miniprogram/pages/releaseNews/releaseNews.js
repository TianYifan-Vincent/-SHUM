// pages/releaseNews/releaseNews.js
var filePath = [];
var pUrl = [];
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    link: '',
    content: '',
    members: '',
    pictureArr: [],
    pUrl: [],
    currentDate: new Date().getTime(),
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
    console.log(this.data.currentDate)
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
    var link = that.data.link
    var pictureArr = that.data.pictureArr
    if (title == '') {
      wx.showToast({
        title: '标题不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (link == '') {
      wx.showToast({
        title: '推文链接不能为空',
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
    db.collection("newsIdeal").add({
      data: {
        title: this.data.title,
        upLoadTime: {
          $date: Date.now()
        },
        url: this.data.link.trim(),
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
      count:1,
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
    this.setData({
      pictureArr: [],
      title: '',
      time: '',
      content: '',
      link:''
    })
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