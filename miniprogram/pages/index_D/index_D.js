// index/gun/jsSwiper2/jsSwiper2.js
Page({

  /**
  * 页面的初始数据
  */
  data: {
  startX: 0,
  endX: 0,
  iCenter: 3,
  
  
  datas: [
  {
   id: 1,
   zIndex: 4,
   opacity: 0.6,
   left: 0,
   iamge: "https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/mypicture/suyuan.jpg?sign=868c8423e1dc0812143f833215c1f8c2&t=1639989906",
   animation: null
  },
  {
   id: 2,
   zIndex: 6,
   opacity: 0.8,
   left: 30,
   iamge: "https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/mypicture/xiaoshiguan.jpg?sign=d54161f5540a2eb6baac91da3362c0aa&t=1639989888",
   animation: null
  },
  {
   id: 3,
   zIndex: 8,
   opacity: 1,
   left: 30,
   iamge: "https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/mypicture/longmen.jpg?sign=281aad584b398678893769dbe128b3a9&t=1639989871",
   animation: null
  },
  {
   id: 4,
   zIndex: 6,
   opacity: 0.8,
   left: 45,
   iamge: "https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/mypicture/sanxingdui.jpg?sign=c46989cb76f91cf6c180af8403410cb3&t=1639989849",
   animation: null
  },
  {
   id: 5,
   zIndex: 4,
   opacity: 0.6,
   left: 60,
   iamge: "https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/mypicture/qipao.jpg?sign=a4888ec91400d8ba967b5124cc73bb0a&t=1639989828",
   animation: null
  },

  ],
  order: []
  },
 
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
  this.__set__();
  this.move();
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
 
  },
  move: function () {
  var datas = this.data.datas;
  /*图片分布*/
  for (var i = 0; i < datas.length; i++) {
   var data = datas[i];
   var animation = wx.createAnimation({
   duration: 200
   });
   animation.translateX(data.left).step();
   this.setData({
   ["datas[" + i + "].animation"]: animation.export(),
   ["datas[" + i + "].zIndex"]: data.zIndex,
   ["datas[" + i + "].opacity"]: data.opacity,
   })
  }
  },
  /**左箭头 */
  left: function () {
  //
  var last = this.data.datas.pop(); //获取数组的最后一个
  this.data.datas.unshift(last);//放到数组的第一个
  var orderFirst = this.data.order.shift();
  this.data.order.push(orderFirst);
  this.move();
  },
  /** */
  right: function () {
  var first = this.data.datas.shift(); //获取数组的第一个
  this.data.datas.push(first);//放到数组的最后一个位置
  var orderLast = this.data.order.pop();
  this.data.order.unshift(orderLast);
  this.move();
  },
  /**点击某项 */
  choose: function (e) {
  var that = this;
  var id = e.currentTarget.dataset.id;
  var order = that.data.order;
  var index = 0;
  for (var i = 0; i < order.length; i++) {
   if (id == order[i]) {
   index = i;
   break;
   }
  }
  if (index < that.data.iCenter) {
   for (var i = 0; i < that.data.iCenter - index; i++) {
   this.data.datas.push(this.data.datas.shift()); //获取第一个放到最后一个
   this.data.order.unshift(this.data.order.pop());
   // this.right() 
   }
  } else if (index > that.data.iCenter) {
   for (var i = 0; i < index - that.data.iCenter; i++) {
   this.data.datas.unshift(this.data.datas.pop()); //获取最后一个放到第一个
   this.data.order.push(this.data.order.shift());
   // this.left();
   }
  }
  
  },
  /**新的排列复制到新的数组中 */
  __set__: function () {
  var that = this;
  var order = that.data.order;
  var datas = that.data.datas;
  for (var i = 0; i < datas.length; i++) {
   that.setData({
   ["order[" + i + "]"]: datas[i].id
   })
  }
  },
  //手指触发开始移动
  moveStart: function (e) {
  console.log(e);
  var startX = e.changedTouches[0].pageX;
  this.setData({
   startX: startX
  });
  },
  //手指触摸后移动完成触发事件
  moveItem: function (e) {
  console.log(e);
  var that = this;
  var endX = e.changedTouches[0].pageX;
  this.setData({
   endX: endX
  });
  //计算手指触摸偏移剧距离
  var moveX = this.data.startX - this.data.endX;
  //向左移动
  if (moveX > 20) {
   this.left();
  }
  if (moveX < -20) {
   this.right();
  }
  },
 })