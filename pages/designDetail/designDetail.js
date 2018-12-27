var stringUtil = require('../../utils/stringUtil.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    tid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '设计申请'
    });
    var tid = options.tid;
    that.setData({
      tid: tid
    });
    // wx.showLoading({
    //   title: '加载中...',
    // });
    wx.request({
      url: app.globalData.base_url + '/design/detail/apply/'+ tid,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        wx.hideLoading();
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '获取详情失败，请重试');
        if (!aipStatus) {
          return;
        }
        var detail = data.data;
        var addressInfo = stringUtil.splitAddress(detail.address);
        detail.address = addressInfo.address;
        detail.area = addressInfo.area;
        detail.imgs = detail.imglink.split(',');
        var budgetList = ['20-50万', '50-100万', '100万以上'];
        detail.budgetStr = budgetList[detail.budget];
        that.setData({
          info: detail,
        });
      },
      fail: function(err){
        wx.hideLoading();
        wx.showToast({
          title: '获取详情失败，请重试',
          icon: 'none',
          duration: 3000
        });
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
