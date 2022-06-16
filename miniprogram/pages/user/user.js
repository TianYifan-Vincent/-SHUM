// pages/user/user.js
const app = getApp()

Page({
  data: {
    logIn: false,
    userInfo: {},
    admin: false,
    appid: '',
    secret: '',
    js_code: '',
    grant_type: '',
    administator:[ 'orP8-4xvI3yZIHyPn7CCFTR8WCVg','orP8-488Vhq32UYhjIZb7OUhlgGE','orP8-40GlAaGZe1ERy1hmh1QaU0k','orP8-45zZHXUKLp-Y9Ouwde3rdsg'],
    userId: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userName:'',
    birth:'',
    school:'',
    sex:"",
    age:"",
    sysPlatform:'',
  },
  getUserProfile(e) {
    var that = this
    wx.getUserProfile({
      desc: '用于活动报名、身份认证',
      success: (res) => {
        wx.cloud.callFunction({
          name: 'helloCloud',
          data: {
            message: 'helloCloud',
          }
        }).then(res => {
          console.log(res)
          this.setData({
            userId: res.result.OPENID
          })
          console.log(that.data.userId)
          var userId = that.data.userId
          var admin = that.data.administator
          for(var i=0;i<admin.length;i++)
          {
            if(userId==admin[i])
            {
              that.setData({
                admin: true
              })
              app.globalData.admin=true
              console.log('global',app.globalData.admin)
            }
          }
          console.log('userid:', userId, 'is admin')
          
        })
        this.setData({
          userInfo: res.userInfo,
          logIn: true
        })
      }
    })

  },
  onLoad: function (options) {
    var that = this
    wx.getSetting({
      withSubscriptions: ({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {}
            })
          } else {
            that.setData({
              logIn: false
            })
          }
        }
      }),
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      app.globalData.userInfo.gender == 0 ? this.setData({ sex: '' }) : (app.globalData.userInfo.gender == 1 ? this.setData({ sex: '男' }) : this.setData({ sex: '女' }))
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true

        })
        res.userInfo.gender == 0 ? this.setData({ sex: '' }) : (res.userInfo.gender == 1 ? this.setData({ sex: '男' }):this.setData({sex:'女'}))
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          res.userInfo.gender == 0 ? this.setData({ sex: '' }) : (res.userInfo.gender == 1 ? this.setData({ sex: '男' }) : this.setData({ sex: '女' }))
        }
      })
    }

    // wx.request({
    //   url: 'http://172.18.233.8:52080/userAuth/userinfo',
    //   header:{
    //     'content-type': "application/x-www-form-urlencoded"
    //   },  
    //   data:{
    //     session_key: wx.getStorageSync("session_key"), 
    //     iv: wx.getStorageSync("iv"), 
    //     encryptedData: wx.getStorageSync("encrypteddata")
    //   },
    //   method: "POST",
    //   success: res=>{
    //     this.setData({
    //       birth: res.data.birth,
    //       sex: res.data.sex == 'man'? '男': (res.data.sex == 'woman' ? '女': ""),
    //       userName: res.data.userName,
    //       school: res.data.school
    //     })

    //     if (res.data.birth != '' && res.data.birth != null){
    //       //计算年龄
    //       var now = new Date()
    //       var now_year = now.getFullYear();
    //       var now_month = now.getMonth();
    //       var now_day = now.getDay();
    //       var birth_year = Number(this.data.birth.substring(0, 4));
    //       var birth_month = Number(this.data.birth.substring(5, 7));
    //       var birth_day = Number(this.data.birth.substring(8));
    //       var age = 0;
    //       if (this.data.birth != '') {
    //         if (now_year >= birth_year) {
    //           age += now_year - birth_year;
    //         }
    //         if (now_month < birth_month) {
    //           age -= 1;
    //         } else if (now_month == birth_month && now_day < birth_day) {
    //           age -= 1;
    //         }
    //         this.setData({
    //           age: age,
    //         });
    //       }
    //     }
    //   }
    // })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  modal_collection: function(e){
    wx.showModal({
      title: '提示',
      content: '该功能正在路上，敬请期待',
      duration:1000,
      showCancel:false,
    }) 
  },
  modal_history: function (e) {
    wx.showModal({
      title: '提示',
      content: '该功能正在路上，敬请期待',
      duration: 1000,
      showCancel: false,
    })
  },
  modal_questionaire: function (e) {
    wx.navigateTo({
      url: '/pages/volunteer/volunteer',
    })
  },
  editinfo:function(e){
    wx.navigateTo({
      url: '/pages/edituserinfo/edituserinfo',
    })
  }
})