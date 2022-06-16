// app.js

App({
  globalData: {
    // 是否为管理员
    admin: false,
    // 是否已经登录
    signed: false,
    // openID
    ID: '',
    volunteer: true,
    transfer: true,
    userInfo:{},
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
      // wx.hideTabBar({
      //   animation: false,
      // })
    }

    // this.globalData = {};
  },

  onShow: function () {
    var that = this
    // 检查志愿者和transfer是否开启
    wx.cloud.callFunction({
      name: 'GetNews',
      data:{
        collection:'Function',
      },
      complete: res => {
        // console.log('hello nmsl')
        console.log('callFunction test result: ', res.result.data.arr[0])
        that.globalData.volunteer = res.result.data.arr[0].volunteer
        that.globalData.transfer = res.result.data.arr[0].transfer
        // that.setData({
        //   volunteer:res.result.data.arr[0].volunteer,
        //   transfer:res.result.data.arr[0].transfer
        // })
        // console.log(that.data.volunteer,that.data.transfer)
      }
    })
  },
  onLoad: function () {
    var that = this
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    //rpx与px单位之间的换算 : 750/windowWidth = 屏幕的高度（rpx）/windowHeight
    var scroll_height = 750 * windowHeight / windowWidth - 150;
    this.setData({
      scroll_height: scroll_height
    })
    
    
  }
});