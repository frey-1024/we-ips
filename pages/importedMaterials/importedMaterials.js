var stringUtil = require('../../utils/stringUtil.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },
  goMetarials: function(e) {
    const tid = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../importedTiles/importedTiles?tid=' + tid + '&name=' + name
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '进口建材'
    });

    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: app.globalData.base_url + '/materials/list',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        wx.hideLoading();
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '获取失败');
        if (!aipStatus) {
          return;
        }
        that.setData({
          list: data.data.rows
        })
      },
      fail: function(err){
        wx.hideLoading();
        that.alertErrorToast('获取失败');
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