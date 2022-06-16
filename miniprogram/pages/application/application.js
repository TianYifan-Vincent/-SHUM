// pages/application/application.js
var app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    label:[],
    active: 0,
    imageSrc: '../../images/pic1.png',
    show: false, //控制弹出层是否弹出的值
    disabled: true, //默认不可提交
    columns: ['男', '女'], //选择器中的值
    columns2: ['是', '否'], //选择器中的值
    gender: '', //选择性别之后的值进行页面显示
    stuName: '',
    major: '',
    phone: '',
    email: '',
    experience: '',
    expertise: '',
    language: '',
    time: '',
    min: 5, //最少字数
    max: 300, //最多字数
    self_info: '', //自我介绍
    flag: '',
    btn_flag:false//控制按钮
  },
  showPopup(e) { //点击选择性别，打开弹出层（选择器）
    this.setData({
      show: true
    })
  },
  onClose() { //点击空白处开闭弹出层（选择器）及选择器左上角的取消
    this.setData({
      show: false
    });
  },
  onConfirm(e) { //选择器右上角的确定，点击确定获取值
    this.setData({
      gender: e.detail.value,
      show: false
    })
  },
  onConfirm2(e) { //选择器右上角的确定，点击确定获取值
    this.setData({
      experience: e.detail.value,
      show: false
    })
  },
  submit(){
    var that = this
    if(this.data.flag==''||this.data.flag=='未通过'){
    if (this.data.stuName == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'error',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else if (this.data.phone == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'error',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (this.data.email == '') {
      wx.showToast({
        title: '邮箱不能为空',
        icon: 'error',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (this.data.time == '') {
      wx.showToast({
        title: '服务时间不能空',
        icon: 'error',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else if (this.data.self_info == '') {
      wx.showToast({
        title: '自我介绍不能空',
        icon: 'error',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else {
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000,
        success: res => {
          for(var t = Date.now();Date.now() - t <= 2000;);
          wx.navigateBack({
            delta: 1,
          })
        }
      })
      
      //判断是第一次提交还是第二次
      if(this.data.flag=='未通过'){
        const db=wx.cloud.database();
        wx.cloud.callFunction({
          name:'update2',
          data:{
            collection: 'vol_info',
            id:app.globalData.ID,
            flag:this.data.flag
          }
        }).then(res=>{
          that.onLoad()//重新加载按钮
        })
      }else{
        this.getData1()
      }
    }
  }
  else{
    wx.showToast({
      title: '已经提交过申请',
      icon: 'error',
      duration: 1500
    })
  }
  },
 
  bindTextAreaBlur(e) {
    this.setData({
      self_info: e.detail.value
    })
  },
  getData1: function (e) {
    var getdata = this.data;
    const db = wx.cloud.database();
    db.collection("vol_info").add({
      data: {
        stuName: getdata.stuName,
        major: getdata.major,
        gender: getdata.gender,
        phone: getdata.phone,
        email: getdata.email,
        flag: '待审核',
        expertise: getdata.expertise,
        language: getdata.language,
        experience: getdata.experience,
        time: getdata.time,
        self_info: getdata.self_info,
      }
    }).then(res => {
      console.log("添加至数据库成功", res)
    }).catch(res => {
      console.log("添加失败", res)
    })
  },

  uploadPic: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          imageSrc: res.tempFilePaths
        });
      }
    })
  },

  //字数限制  
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    // //最少字数限制
    // if (len < this.data.min) {
    //   wx.showToast({
    //     title: '还不满五个字哦！',
    //   })
    // }
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },
  onLoad:function(){ //判断是否用户已申请过
    var that=this
    wx.cloud.callFunction({
      name: 'helloCloud',
      data: {
        message: 'helloCloud',
      }
    }).then(res => {
      console.log(res.result.OPENID)//res将appid和openid返回
      var openid=res.result.OPENID
      const db = wx.cloud.database();
      db.collection('vol_info').where({
        _openid: openid
      })
        .get()
        .then(res => {
          console.log("获取志愿者openid成功")
          console.log(res.data)
          if (res.data[0]){
            this.setData({
              flag:res.data[0].flag
            })
            if (res.data[0].flag=='待审核'){
              wx.showToast({
                title: '申请正在待审核',
                icon: 'error',
                duration: 1500
              })
              this.setData({
                btn_flag:true
              })
            }else if (res.data[0].flag=='已通过'){
              wx.showToast({
                title: '申请已通过',
                icon: 'error',
                duration: 1500
              })
              this.setData({
                btn_flag:true
              })
            }else if (res.data[0].flag=='未通过'){
              // wx.showToast({
              //   title: '申请未通过',
              //   icon: 'error',
              //   duration: 1500
              // })
              this.setData({
                btn_flag:false
              })
            }else{
  
            }
          }else{

          }
        })
    })
  },
  onShow: function () {
    const that = this;
    db.collection('Function').doc('6d85a2b962668dc600355ebe2c824397').get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      var li = [res.data.f1,res.data.f2,res.data.f3,res.data.f4,res.data.f5]
      that.setData({
        label: li
      })
    })


  }
})