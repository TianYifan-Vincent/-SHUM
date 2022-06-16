// pages/activityList/activityList.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    participants:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var title=options.title
    var that=this
    var promiseArr = []
    console.log(title)
    db.collection('activityIdeal').where({
        title:title
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        if(res.data.length>0){
            console.log(res.data[0])
            that.setData({
              list:res.data[0].participants
            })
            var list=that.data.list
            var participants=[]
            for(let index=0;index<list.length;index++){
              let promise = new Promise((resolve,reject)=>{
                db.collection('user').where({
                  ID:list[index]
                })
                .get({
                  success: function(res) {
                    // res.data 是包含以上定义的两条记录的数组
                    console.log(res.data)
                    participants.push(res.data)
                    resolve(res)
                  },
                  fail:function (error) {
                    reject(error)
                  },
                  complete:function (res) {
                    
                  },
                })
              });
              promiseArr.push(promise)
            }
            Promise.all(promiseArr).then((res) => {
              // console.log('?',res)
              console.log('promise',participants)
              that.setData({
                participants:participants[0]
              })
              console.log(that.data.participants)
            })
            
        }
        
      }
    })
    
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