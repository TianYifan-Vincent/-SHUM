const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = false
innerAudioContext.src = 'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/mymusic/%E6%83%B3.mp3?sign=a5fae2d2b12343b8fd068594fa128682&t=1637825718'
var musickey=0
var touchDot = 0;//触摸时的原点
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = "";// 记录/清理时间记录
var change_page=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    guide_pic: {},
    top:0
  },
  touchStart: function (e) {
    touchDot = e.touches[0].pageY; // 获取触摸时的原点
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);
    console.log("touching")
  },
  // 触摸移动事件
  touchMove: function (e) {
    var touchMove = e.touches[0].pageY;
    console.log("moving")
    console.log(touchMove-touchDot);
    if(touchMove - touchDot <= -30 && time < 10)
      wx.pageScrollTo({
        scrollTop: this.data.windowHeight,
        duration: 300
      })
      // if(change_page==0)
      // {
        
      //   wx.navigateTo({
      //     url: '/pages/relic_down/relic_down'
      //   })
      //   .then(res=>{
      //     change_page=0,
      //     console.log(change_page)
      //   }); 
      //   change_page=1
      // }
  },
  // 触摸结束事件
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval
    time = 0;
  },
  music(){
    if(musickey==0)
    {
      innerAudioContext.play();
      musickey=1;
    }
    else
    {
      innerAudioContext.pause();
      musickey=0;
    }
  },
  audioPlay(){
    innerAudioContext.play()
  },
  audioPause(){
    innerAudioContext.pause()
  },
  audioStart(){
    innerAudioContext.stop()
    innerAudioContext.play()
  },
  audioStop(){
    innerAudioContext.stop()
  },
  pushdown:function(e){
    wx.pageScrollTo({
      scrollTop: this.data.windowHeight,
      duration: 1000,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("load ok")
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
    console.log("show ok")
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
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