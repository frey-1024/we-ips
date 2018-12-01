const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '订单详情'
    });
    var ordernum = options.ordernum;
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: app.globalData.base_url + '/orders/details?ordernum='+ ordernum,
      header: {
        "Content-Type": "applciation/json",
        "sessionid": app.globalData.sessionid
      },
      method: "GET",
      success: function(res){
        console.log(res);
        var detail = res.data.data;
        // 订单状态 0 待接单 1 待上门 2 待确认	3 已完成 4 已取消
        switch (detail.status) {
          case 0:
            detail.statusImg = 'https://ips-source.oss-cn-hangzhou.aliyuncs.com/ipsimg/imgs/detail1.png';
            break;
          case 1:
            detail.statusImg = 'https://ips-source.oss-cn-hangzhou.aliyuncs.com/ipsimg/imgs/detail2.png';
            break;
          case 2:
            detail.statusImg = 'https://ips-source.oss-cn-hangzhou.aliyuncs.com/ipsimg/imgs/detail3.png';
            break;
          case 3:
            detail.statusImg = 'https://ips-source.oss-cn-hangzhou.aliyuncs.com/ipsimg/imgs/detail4.png';
            break;
          case 4:
            detail.statusImg = 'https://ips-source.oss-cn-hangzhou.aliyuncs.com/ipsimg/imgs/detail5.png';
            break;
        }
        that.setData({
          info: detail,
        });
      },
      fail: function(err){
        wx.showToast({
          title: '加载失败，请重试',
          icon: 'none',
          duration: 3000
        });
      },//请求失败
      complete: function(){
        wx.hideLoading();
      }//请求完成后执行的函数
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