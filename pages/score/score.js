Page({

  /**
   * 页面的初始数据
   */
  data: {
    speedVal: 0,
    attitudeVal: 0,
    effectVal: 0,
  },

  speed(e) {
    console.log(e.detail.value);
    this.setData({
      speedVal: e.detail.value
    });
  },
  attitude(e) {
    console.log(e.detail.value);
    this.setData({
      attitudeVal: e.detail.value
    });
  },
  effect(e) {
    console.log(e.detail.value);
    this.setData({
      effectVal: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '0利息分期'
    });
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