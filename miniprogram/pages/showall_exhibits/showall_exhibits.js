// pages/showall_exhibits/showall_exhibits.js
Page({
    data: {
        value: '',
        on_show:[{'name':'海派旗袍','img_path':'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/index_pic/sichou1.1.png?sign=96741d6555895d8927fd31dd92bd1dc8&t=1647447515','intro':"江南望族与海派旗袍特展",'time':'长期'}],
        past_show:[
            {'name':"龙门石窟",'img_path':'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/index_pic/longmen5.jpg?sign=99f2e45b997408d48c1a88ee9e23b8d2&t=1647447425','intro':"'铭心妙相'龙门石窟对话特展",'time':'2021.09.18~2022.1.8'},
            {'name':'三星堆','img_path':'https://636c-cloud1-6gn92kuf97d4a56e-1307723956.tcb.qcloud.la/index_pic/sanxingdui1.1.png?sign=1a8441fb84d8fdfb109876345fe9dd56&t=1647447498','intro':"三星堆-人与神的世界",'time':'2020.11.21~2021.1.15'}
          ],
      },
      onChange(e) {
        this.setData({
          value: e.detail,
        });
      },
      onSearch() {
        // Toast('搜索' + this.data.value);
      },
      onClick() {
        console.log(this.data.value)
        // Toast('搜索' + this.data.value);
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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