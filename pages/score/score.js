var stringUtil = require('../../utils/stringUtil.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    speed: 0,
    attitude: 0,
    effect: 0,
    comment: '',
    tid: ''
  },

  speed(e) {
    console.log(e.detail.value);
    this.setData({
      speed: e.detail.value
    });
  },
  attitude(e) {
    console.log(e.detail.value);
    this.setData({
      attitude: e.detail.value
    });
  },
  effect(e) {
    console.log(e.detail.value);
    this.setData({
      effect: e.detail.value
    });
  },
  onCommentChange(e) {
    this.setData({
      comment: e.detail.value,
    });
  },
  alertErrorToast(tip) {
    wx.showToast({
      title: tip,
      icon: 'none',
      duration: 2000
    });
  },
  submitScore() {
    var that = this;
    var data = that.data;
    if (data.speed === 0) {
      that.alertErrorToast('请选择上门速度');
      return;
    }
    if (data.attitude === 0) {
      that.alertErrorToast('请选择服务态度');
      return;
    }
    if (data.effect === 0) {
      that.alertErrorToast('请选择维修效果');
      return;
    }
    if (data.comment === '') {
      that.alertErrorToast('请填写服务评价');
      return;
    }
    wx.showLoading({
      title: '提交中...',
    });
    wx.request({
      url: app.globalData.base_url + '/repair/comment',
      data:{
        speed: data.speed,
        attitude: data.attitude,
        effect: data.effect,
        comment: data.comment,
        ordernum: parseInt(that.data.tid),
      },
      header: {
        "Content-Type": "applciation/json",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        wx.hideLoading();
        console.log(res);
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '提交失败，请重试');
        if (!aipStatus) {
          return;
        }
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 3000
        });
        wx.navigateBack({
          delta: 2
        });
      },
      fail: function(err){
        wx.hideLoading();
        wx.showToast({
          title: '申请失败，请重试',
          icon: 'none',
          duration: 3000
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '发表评论'
    });
    var tid = options.tid;
    that.setData({
      tid: options.tid
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