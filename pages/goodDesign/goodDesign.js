const app = getApp();

Page({
  data: {
    isShowPhoneWarning: false,
    phoneInfo: app.globalData.phoneInfo,
  },
  onChange(e) {
    console.log(e.detail.key);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '好的设计，从一而终'
    });
    wx.checkSession({
      success: function () {
      },
      fail:function(err){
        app.wxLogin();
      },
    });
  },
  getDesignDetail() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: app.globalData.base_url + '/repair/applies?offset=0&limit=199999999',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        console.log(res);
        var data = res.data;
        if (data.code !== 200) {
          that.alertErrorToast('获取列表失败，请重试');
          return;
        }
        var orders = data.data.rows;
        that.setData({
          orders: orders,
          previewOrders: orders
        });
      },
      fail: function(err){
        that.alertErrorToast(err.msg || '获取列表失败，请重试');
      },//请求失败
      complete: function(){
        wx.hideLoading();
      }//请求完成后执行的函数
    })
  },
  getPhoneNumber(e) {
    var that = this;
    if (e.detail.errMsg.indexOf(':fail') > -1) {
      that.setData({
        isShowPhoneWarning: true
      });
    } else {
      app.getPhoneInfo(e.detail, function(phoneInfo) {
        app.globalData.phoneInfo = phoneInfo;
        that.getDesignDetail();
      });
    }
  },
  hidePhoneModal() {
    this.setData({
      isShowPhoneWarning: false
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
    if (app.globalData.phoneInfo) {
      this.setData({
        phoneInfo: app.globalData.phoneInfo,
      });
    }
    app.userPhoneReadyCallback = () => {
      if (app.globalData.phoneInfo) {
        this.setData({
          phoneInfo: app.globalData.phoneInfo,
        });
      }
    };
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