// const db = wx.cloud.database()
let col1H = 0;
let col2H = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    show_info: [],
    pageNumber: 0,
    loadMore: false,
    loadAll: false,
    delID: '',
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    col1: [],
    col2: [],
    cls: '',
    pics: [],
    show: false,
    defaultimg: "../../images/default.png",
    all: false,
    firstall: false
  },
  // getData(cls) {
  //   const that = this;
  //   var returnData='';
  //   db.collection("longmenshiku_waterfall").where({
  //     cls: cls
  //   })
  //     .get({
  //       success: function (res) {
  //         // 修改格式
  //         // 使用that，否则不能给data赋值
  //         res.data.forEach(element => {
  //           that.data.pics.push(element)
  //         });
  //       }
  //     })
  // },
  getNextPage() {
    var page = this.data.pageNumber + 1
    this.setData({
      loadMore: true,
      loadAll: false,
      show: false
    })
    wx.cloud.callFunction({
      name: 'GetNews',
      data: {
        collection: 'longmenshiku_waterfall',
        page: page,
        cls: this.data.cls
      },
      complete: res => {
        var more = this.data.show_info
        more = more.concat(res.result.data.arr)
        console.log(res.result.data.arr)
        if (res.result.data.arr.length < 6) {
          this.setData({
            all: true,
          })
        }
        this.setData({
          loadMore: false,
          loadAll: false,
          show: true,
          pageNumber: page,
          show_info: more
        })
        setTimeout(function () {
          this.setData({
            loading: false,
          });
        }.bind(this), 3000)
      }
    })
  },
  getFirstPage() {
    // this.getData(this.data.cls);
    // console.log(this.data.pics);
    var page = this.data.pageNumber
    this.setData({
      loadMore: true,
      loadAll: false,
      show: false
    })
    wx.cloud.callFunction({
      name: 'GetNews',
      data: {
        collection: 'longmenshiku_waterfall',
        page: page,
        cls: this.data.cls
      },
      complete: res => {
        console.log(res.result.data.arr)
        this.setData({
          loadMore: false,
          loadAll: false,
          show: true,
          show_info: res.result.data.arr
        })
        setTimeout(function () {
          this.setData({
            loading: false,
          });
        }.bind(this), 3000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { cls } = options;
    this.setData({
      cls: cls
    });
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

      }
    })

    this.setData({
      delID: options.delID
    })
    this.getFirstPage()
  },
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度
    let images = this.data.show_info;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.name == imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    if (!loadingCount) {
      data.images = [];
    }
    this.setData(data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onShow')
    var id = this.data.delID
    // console.log('delID', id)

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
  loadImages: function () {


    if (!this.data.all) {
      wx.showLoading({
        title: '加载中',
      })
      // console.log("到底了")
      var that = this
      if (!that.data.loadMore) {
        that.setData({
          loadMore: true,//加载中
          loadAll: false
        })
        setTimeout(function () {
          that.getNextPage()
          wx.hideLoading()

        }, 2000)

      }


    }
    else if (!this.data.firstall) {
      this.setData({
        firstall: true,
      })
      wx.showToast({
        title: '已无更多',
        icon: 'success',
        duration: 2000,

      })

    }





  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})