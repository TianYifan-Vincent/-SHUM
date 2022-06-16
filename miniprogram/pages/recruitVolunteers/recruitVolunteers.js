// pages/recruitVolunteers/recruitVolunteers.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ne:[],//存放待审核的数组
    ne2:[],//存放已审核的数组
    empty1:-1,
    empty2:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // wx.cloud.callFunction({
    //   //云函数名称
    //   name: 'Getvol_info'
    // })
    // .then(res=>{
    //   console.log(res.result.data);
    //   let lists=res.result.data
    //   let list1=[]
    //   let list2=[] //用来装待审核和已审核的数组
    //   for (let i of lists){
    //     if(i.flag=="待审核") {
    //       list1.push(i)
    //     }else if(i.flag=='已通过'){
    //       list2.push(i)
    //     }else{

    //     }
    //   }
    //   this.setData({
    //     ne:list1,
    //     ne2:list2,
    //     empty1:list1.length,
    //     empty2:list2.length
    //   })
    //   console.log(list1.length,list2.length)
    // })
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
    wx.cloud.callFunction({
      //云函数名称
      name: 'Getvol_info'
    })
    .then(res=>{
      console.log(res.result.data);
      let lists=res.result.data
      let list1=[]
      let list2=[] //用来装待审核和已审核的数组
      for (let i of lists){
        if(i.flag=="待审核") {
          list1.push(i)
        }else if(i.flag=='已通过'){
          list2.push(i)
        }else{

        }
      }
      var e1 = list1.length
      var e2 = list2.length
      console.log(e1,e2)
      this.setData({
        ne:list1,
        ne2:list2,
        empty1:e1,
        empty2:e2
      })
      // console.log(list1.length,list2.length)
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

  },
  check:function(e){
    console.log(e.target.id)
    var that=this
    var _id=e.target.id//通过id控制哪一个button
    var id=that.data.ne[_id-1]._openid
    var flag=that.data.ne[_id-1].flag
    console.log(that.data.ne[_id-1]._openid)//获取openid
    // console.log(_id)
    const db=wx.cloud.database();
    wx.cloud.callFunction({
      name:'update2',
      data:{
        collection: 'vol_info',
        id:id,
        flag:flag
      }
    }).then(res=>{
      that.onLoad()//重新加载按钮
    })
  },
  cancle:function(e){
    console.log(e.target.id)
    var that=this
    var _id=e.target.id//通过id控制哪一个button
    var id=that.data.ne[_id-1]._openid
    console.log(that.data.ne[_id-1]._openid)//获取openid
    // console.log(_id)
    const db=wx.cloud.database();
    wx.cloud.callFunction({
      name:'update3',
      data:{
        collection: 'vol_info',
        id:id
      }
    }).then(res=>{
      that.onLoad()//重新加载按钮
    })
  }
})