var stringUtil = require('../../utils/stringUtil.js');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterList: stringUtil.cabinetsList(),
    selectedIndex: 0,
    selectedText: stringUtil.cabinetsList()[0],
    previewList: [],
  },
  selectingFilter(e) {
    const val = e.detail.value;
    this.setData({
      selectedText: this.data.filterList[val],
      selectedIndex: val,
    });
    this.packagePreviewUrlList();
  },
  packagePreviewUrlList() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: app.globalData.base_url + '/cupboard/list?offset=0&limit=199999999&style=' + that.data.selectedIndex,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        wx.hideLoading();
        console.log(res);
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '获取图片列表失败， 请重试');
        if (!aipStatus) {
          return;
        }
        that.setData({
          previewList: data.data.rows,
        });
      },
      fail: function(err){
        wx.hideLoading();
        wx.showToast({
          title: '获取图片列表失败， 请重试',
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
      title: '进口橱柜'
    });
    that.packagePreviewUrlList();
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