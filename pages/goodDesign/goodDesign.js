const app = getApp();

Page({
  data: {
    show: false,
    isShowPhoneWarning: false,
    test: ''
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
  decodePhoneNumber(encryptedData, iv) {
    wx.request({
      url: app.globalData.base_url + '/users/phone',
      data:{
        encryptedData: encryptedData,
        iv: iv
      },
      header:{
        "Content-Type":"applciation/json",
        "sessionid": app.globalData.sessionid
      },
      method:"POST",
      success:function(res){
        app.globalData.phoneNumber = res.data.data.phoneNumber;
        console.log(res);
      },
      fail:function(err){},//请求失败
      complete:function(){}//请求完成后执行的函数
    })
  },
  getPhoneNumber(e) {
    var that = this;
    if (e.detail.errMsg.indexOf(':fail user deny') > -1) {
      that.setData({
        isShowPhoneWarning: true
      });
    } else {
      if (!app.globalData.sessionid) {
        app.userSessionIdReadyCallback = res => {
          that.decodePhoneNumber(e.detail.encryptedData, e.detail.iv);
        }
      } else {
        that.decodePhoneNumber(e.detail.encryptedData, e.detail.iv);
      }
    }
  },
  hideModal() {
    this.setData({
      test: ''
    });
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