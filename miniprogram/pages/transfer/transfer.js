// pages/transfer/transfer.js
const app = getApp()
Page
  ({

    /**
     * 页面的初始数据
     */
    data: {
      volunteer: true,
      swiperIndex2: 0,
      length: 6,
      example: ['https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/buddha_lotus.png?sign=1fd951fab64659d371851d383cd6d76a&t=1654341858',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/lotus.png?sign=bd9f1eeaa5a18a1ba9f2cfeed6db4465&t=1654341838',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/color_lotus.png?sign=d1c845fe280c23ab737e925c32d3ea08&t=1654341872',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/bronze_lotus.png?sign=4b32a89fcedfc302b7eb9ca51e060f6d&t=1654341890',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/udnie_lotus.png?sign=3693277a8ae79c416fee857010ee1bf7&t=1654341912',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/mosaic_lotus.png?sign=b7a83a203f8cd25aeba0d7e53c157d2a&t=1654341925'
      ], //所有style荷花
      images: ['https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/buddha_lotus.png?sign=1fd951fab64659d371851d383cd6d76a&t=1654341858',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/lotus.png?sign=bd9f1eeaa5a18a1ba9f2cfeed6db4465&t=1654341838',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/color_lotus.png?sign=d1c845fe280c23ab737e925c32d3ea08&t=1654341872',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/bronze_lotus.png?sign=4b32a89fcedfc302b7eb9ca51e060f6d&t=1654341890',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/udnie_lotus.png?sign=3693277a8ae79c416fee857010ee1bf7&t=1654341912',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/mosaic_lotus.png?sign=b7a83a203f8cd25aeba0d7e53c157d2a&t=1654341925'
      ], //大图，初始与example相同
      style: ['https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/Buddha.png?sign=b0934ee34613f9b4b4a65f03b93cf27b&t=1654337261',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/lotus.png?sign=bd9f1eeaa5a18a1ba9f2cfeed6db4465&t=1654341838',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/color.png?sign=6c9979b7a2e1afa911adfd8b25bcf6b6&t=1654337292',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/bronze_mask.png?sign=0d54243a4c2b0d49578733d7797872f4&t=1654337308',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/udnie.png?sign=5c603876a6a8fcf816ab8d8db2c233dc&t=1654337329',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/mosaic.png?sign=ddb6f22c3a5849de9b7cfb75fccfe66f&t=1654337339'
      ], //小样式，每次只需更新原图
      style_name: ['龙门石窟', '原图', '彩韵', '青铜面具', 'udnie', 'mosaic'],
      upload: 0,
      upload_img: '', //上传的照片
      window_heigt: '', //屏幕高
      window_width: '', //屏幕宽
      canv: {
        width: '', //canvas宽
        height: '', //canvas高
      },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    saveimg() {
      var idx = this.data.swiperIndex2
      var images = this.data.images
      console.log('loading')
      wx.downloadFile({
        url: images[(idx + 1) % 6], //图片的地址
        success: function (res) {
          const tempFilePath = res.tempFilePath //如果请求成功，则通过res中的tempFilePath 得到需要下载的图片地址
          console.log(tempFilePath); //方便查看，这里打印路径，并且提示请求成功
          console.log("请求到了");
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath, //设置下载图片的地址
            success: function () {
              console.log("保存成功"); //保存成功后进行的提示
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    reset() {
      //初始style
      var style = ['https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/Buddha.png?sign=b0934ee34613f9b4b4a65f03b93cf27b&t=1654337261',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/lotus.png?sign=bd9f1eeaa5a18a1ba9f2cfeed6db4465&t=1654341838',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/color.png?sign=6c9979b7a2e1afa911adfd8b25bcf6b6&t=1654337292',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/bronze_mask.png?sign=0d54243a4c2b0d49578733d7797872f4&t=1654337308',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/udnie.png?sign=5c603876a6a8fcf816ab8d8db2c233dc&t=1654337329',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/mosaic.png?sign=ddb6f22c3a5849de9b7cfb75fccfe66f&t=1654337339'
      ]
      // 各种样式荷花
      var image = ['https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/buddha_lotus.png?sign=1fd951fab64659d371851d383cd6d76a&t=1654341858',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/lotus.png?sign=bd9f1eeaa5a18a1ba9f2cfeed6db4465&t=1654341838',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/color_lotus.png?sign=d1c845fe280c23ab737e925c32d3ea08&t=1654341872',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/bronze_lotus.png?sign=4b32a89fcedfc302b7eb9ca51e060f6d&t=1654341890',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/udnie_lotus.png?sign=3693277a8ae79c416fee857010ee1bf7&t=1654341912',
        'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/style/mosaic_lotus.png?sign=b7a83a203f8cd25aeba0d7e53c157d2a&t=1654341925'
      ]
      console.log('reset')
      this.setData({
        style: style,
        images: image,
        upload: 0,
        length: 6,
        swiperIndex2: 0
      })
    },
    bindchange2(e) {
      this.setData({
        swiperIndex2: e.detail.current
      })
      // console.log(e.detail.current)
    },
    onLoad: function (options) {

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          //获取屏幕窗口高度和宽度
          that.data.window_heigt = res.windowHeight
          that.data.window_width = res.windowWidth
        },
      })
    },
    //拍照或选择图片
    chanceImg: function () {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
        sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
        success: res => {
          // console.log(res.tempFilePaths[0]),
          that.setData({
            upload: 1
          });
          var upload_img = res.tempFilePaths[0]
          // var upload = this.data.upload
          this.cropper = this.selectComponent("#yeyouzi-cropper");
          this.cropper.init({
            imgPath: upload_img, //imgPath是需要裁剪图片的图片路径，只支持本地或临时路径
            success(res) {
              // console.log("res",res) //res即裁剪成功后的图片临时路径
              that.setData({
                images: [res],
                length: 1
              })
              console.log(that.data.length)
            },
            fail(error) {
              console.log(error) //有两种:cancel代表点击了叉，fail代表wx.canvasToTempFilePath生成图片失败
            }
          })
        }
      })
    },

    //风格化：上传至服务器并接收
    stylize: function () {
      var that = this;
      that.setData({
        swiperIndex2: 0
      })
      if (that.data.images.length > 0) {
        console.log("that.data.images[0]:", that.data.images[0])
        wx.showLoading({
          title: '正在上传',
        })
        wx.uploadFile({
          url: "https://www.yxslinux.cn/upload", //接口地址
          filePath: that.data.images[0],
          name: 'file',
          success: function (res1) {
            wx.showToast({
              icon: "success",
              title: '上传成功',
            })
            // console.log(res1.data.split(','))
            var arr0 = res1.data.split(',')
            var arr = new Array()
            arr.push(arr0[0])
            arr.push(arr0[5])
            arr.push(arr0[1])
            arr.push(arr0[2])
            arr.push(arr0[3])
            arr.push(arr0[4])
            var pl = that.data.style
            pl.splice(1, 1)
            pl.splice(1, 0, that.data.images[0])
            console.log(pl)
            that.setData({
              images: arr,
              style: pl,
              length: 6
            })
          }
        });
      }
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      var transfer = app.globalData.transfer
      console.log('app', app.globalData)
      console.log('??????', app.globalData.transfer)
      this.setData({
        transfer: transfer
      })
      // var transfer = this.data.transfer
      if (!transfer) {
        wx.showModal({
          title: '尚未开放',
          // content: '这是一个模态弹窗',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
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