// pages/explore/explore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    num: 0,
    showpic: null,
    hidepic: null,
    hiddenName: false,
    show: false,
    swiperHeight: 380,
    swiperweight: 500,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    value: 5,
    functions: ['全景漫游', '资讯', '文物藏品', '志愿者', '预约'],
    functions2: ['to_VR', 'to_News', 'to_selection', 'to_volunteer', 'to_reservation'],
    funUrl: [
      '../../images/function_icon/museum.png',
      '../../images/function_icon/pigeon.png',
      '../../images/function_icon/vase.png',
      '../../images/function_icon/book.png',
      '../../images/function_icon/yulan.png'
    ],
    picUrls: [
      '../../images/qian.png',
      '../../images/bamboo.png',
      '../../images/china.png',
      '../../images/mangnolia.png',
      '../../images/order.png',
      '../../images/love.png'
    ],
    picUrls2: [
      '../../images/top_img/house.png',
      '../../images/top_img/people.png',
      '../../images/top_img/art.png',
      '../../images/top_img/book.png',
      '../../images/top_img/crane.png'
    ],
    imgUrls: [],
    latestName: "",
    swiperIndex: 0, //这里不写第一次启动展示的时候会有问题
    swiperIndex2: 0,
    onChange(event) {
      this.setData({
        value: event.detail,
      });
    },
    pastshow_arr: [],
    show_info: []
  },
  // onRefresh: function () {
  //   //导航条加载动画
  //   wx.showNavigationBarLoading()
  //   //loading 提示框
  //   wx.showLoading({
  //     title: 'Loading...',
  //   })
  //   console.log("下拉刷新啦");
  //   setTimeout(function () {
  //     wx.hideLoading();
  //     wx.hideNavigationBarLoading();
  //     //停止下拉刷新
  //     wx.stopPullDownRefresh();
  //   }, 2000)
  // },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  //   this.onRefresh();
  // },

  pushdown: function (e) {
    var _this = this;
    var num = _this.data.num;
    var animation = wx.createAnimation({}) //创建一个动画实例
    _this.setData({
      //创建一个计时器
      setTime: setInterval(function () {
        _this.setData({
          num: num++
        })

        if (num > 2) {
          // num=0
          _this.setData({
            flag: "none"
          })
          wx.showTabBar({
            animation: false,
          })
        }
        //淡出
        animation.opacity(0).step({
          duration: 1000
        })
        _this.setData({
          hidepic: animation.export(),
        })
      }, 1000)
    })
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
    // console.log(e.detail.current)
  },
  bindchange2(e) {
    this.setData({
      swiperIndex2: e.detail.current
    })
    // console.log(e.detail.current)
  },
  to_VR() {
    wx.navigateTo({
      url: '/pages/VRpanorama/VRpanorama',
    })
  },
  to_volunteer() {
    wx.navigateTo({
      url: '/pages/volunteer/volunteer',
    })
  },
  to_reservation() {
    wx.navigateTo({
      url: '/pages/reservation/reservation',
    })
  },
  to_News() {
    wx.navigateTo({
      url: '/pages/all_show/all_show',
    })
  },
  to_selection() {
    wx.navigateTo({
      url: '/pages/showall_exhibits/showall_exhibits',
    })
  },
  to_questionnaire() {
    wx.navigateTo({
      url: '/pages/questionnaire/questionnaire',
    })
  },
  to_detail() {
    wx.navigateTo({
      url: '../../pages/exhibition_detail/exhibition_detail',
    }).then({
      success: res => {
        console.log('jump successfully')
      },
      error: res => {
        console.log('jump failed')
      }
    })
  },
  to_all() {
    wx.navigateTo({
      url: '/pages/to_all/to_all?latestName=' + this.data.latestName
    })
  },
  load: function () {
    //找最新的展览
    wx.cloud.callFunction({
      name: 'GetNews',
      data: {
        collection: 'exhibitions',
        page: 0
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        var more = this.data.show_info
        more = more.concat(res.result.data.arr)
        this.setData({
          show_info: more
        })
        console.log(this.data.show_info)

        //冒泡排序

        for (var i = 0; i < more.length; i++) {
          for (var j = i + 1; j < more.length; j++)
            if (more[i].timeDS < more[j].timeDS) {
              var t = more[i];
              more[i] = more[j];
              more[j] = t
            }
        }
        more[0].page_url = "../../pages/exhibition_detail/exhibition_detail"
        var imgUrls = this.data.imgUrls

        imgUrls = imgUrls.concat(more[0])
        more = [more[0], more[1], more[2]]
        this.setData({
          imgUrls: imgUrls,
          show_info: [],
          pastshow_arr: more,
          latestName: more[0].name
        })
        console.log(this.data.imgUrls)
      }
    })
    //找最新的咨询
    wx.cloud.callFunction({
      name: 'GetNews',
      data: {
        collection: 'newsIdeal',
        page: 0
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        var more = this.data.show_info
        more = more.concat(res.result.data.arr)
        this.setData({
          show_info: more
        })
        console.log(this.data.show_info)
        var j = 0
        var maxtime = more[0].upLoadTime
        for (var i = 0; i < more.length; i++) {
          if (more[i].upLoadTime > maxtime) {
            maxtime = more[i].upLoadTime
            j = i
          }
        }
        more[j].page_url = '/pages/show_news/show_news?link=' + more[j].url
        // 此处缺少img_path属性需要加上by Ideal 0605
        more[j].img_path = more[j].fileID[0]
        var imgUrls = this.data.imgUrls

        imgUrls = imgUrls.concat(more[j])
        this.setData({
          imgUrls: imgUrls,
          show_info: []
        })
        console.log(this.data.imgUrls)
      }
    })
    //找最新的活动
    wx.cloud.callFunction({
      name: 'GetNews',
      data: {
        collection: 'activityIdeal',
        page: 0
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        var more = this.data.show_info
        more = more.concat(res.result.data.arr)
        this.setData({
          show_info: more
        })
        console.log(this.data.show_info)
        var j = 0
        for (var i = 0; i < more.length; i++) {
          var str = more[i].time
          str = str.replace(/-/g, "/");
          more[i].time = new Date(str)
        }
        var maxtime = more[0].time
        for (var i = 0; i < more.length; i++) {
          if (more[i].time > maxtime) {
            maxtime = more[i].time
            j = i
          }
        }
        console.log('morej',more[j])
        more[j].page_url = "../../pages/reservation/reservation"
        // 此处缺少img_path属性需要加上by Ideal 0605
        more[j].img_path = more[j].fileID[0]
        var imgUrls = this.data.imgUrls
        imgUrls = imgUrls.concat(more[j])
        this.setData({
          imgUrls: imgUrls,
          show_info: []
        })
        console.log(this.data.imgUrls)
      }

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      width: Number(wx.getSystemInfoSync().windowWidth)
    })
    console.log(this.data.width)
    var _this = this;
    var num = _this.data.num;
    var animation = wx.createAnimation({}) //创建一个动画实例
    _this.setData({
      //创建一个计时器
      setTime: setInterval(function () {
        _this.setData({
          num: num++
        })
        if (num > 2) {
          // num=0
          _this.setData({
            flag: "none"
          })
          //     wx.showTabBar({
          //   animation: false,
          //  })
        }
        //淡出
        animation.opacity(0).step({
          duration: 2000
        })
        _this.setData({
          hidepic: animation.export(),
        })
      }, 2000)
    })
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