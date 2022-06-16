// Pages/details.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pStyle: 'overflow:hidden',
    // 背景图片
    BgcPic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.sc.enterdesk.com%2Fedpic%2Ff7%2F26%2F55%2Ff72655f33464c3e9787ede11c3cf35f2.jpg",
    // 文物图片
    Pic: "",
    // 名称
    Name: "",
    Location: "上海",
    Tags: "",
    Introduction: "",
    // 控制pop层参数
    TopShow: true,
    PicShow: false,
    // 动画参数
    transition: "slide-up",
    //音乐播放参数
    status: "等待播放",
    isplay: false,
    PlayIcon: "play",
    MusicIcon: "music-o",
    MusicSrc: '',
    noneMusic:false,
    // 分享图标
    ShareIcon: "share-o"
  },
  OnClose() {
    console.log(this.data.pStyle)
    this.setData({
      TopShow: false,
      pStyle: 'overflow:scroll'
    });
    console.log(this.data.pStyle)
  },
  MovePic() {
    this.setData({
      TopShow: true
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      name
    } = options;
    console.log(name);
    this.getData(name);
  },
  getData(name) {
    const that = this;
    db.collection("longmenshiku_waterfall").where({
      name: name
    }).get({
      success: function (res) {
        // 修改格式
        const [data] = res.data;
        // 使用that，否则不能给data赋值
        console.log(data.musicSrc)
        if(!data.musicSrc)
        {
          that.setData({
            noneMusic:true
          })
        }
        that.setData({
          MusicSrc: data.musicSrc,
          Name: data.title,
          Tags: data.tags,
          Introduction: data.introduction,
          Pic: data.pic,
        })
        that.ReadyPlay();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  ReadyPlay() {
    this.setData({
      show: true,
      direction: 'down',
      pStyle: 'overflow:hidden'
    });
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.src = this.data.MusicSrc;
    console.log(this.innerAudioContext.src);
    console.log(this.data.MusicSrc);
    this.innerAudioContext.loop = true;
  },
  onReady: function () {},
  // 音乐播放函数
  audioPlay() {
    
    var none = this.data.noneMusic 
    if (none) {
      wx.showToast({
        title: '暂无音频',
        icon: 'none',
        duration: 2000
      })
    } else {
      if (this.data.isplay == false) {
        this.innerAudioContext.play();
        this.innerAudioContext.onPlay(() => {
          this.setData({
            isplay: true,
            status: "正在播放",
            PlayIcon: "pause",
            MusicIcon: "music"
          });
        })
      } else {
        this.innerAudioContext.pause();
        this.innerAudioContext.onPause(() => {
          this.setData({
            isplay: false,
            status: "暂停播放",
            PlayIcon: "play",
            MusicIcon: "music-o"
          });
        })
      }
    }
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
    this.innerAudioContext.destroy();
    this.setData({
      isplay: false,
      status: "停止播放",
      PlayIcon: "play",
      MusicIcon: "music-o"
    })
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