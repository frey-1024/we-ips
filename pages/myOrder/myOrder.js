const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    previewOrders: [],
  },
  findListByFilter(currentStatus1, currentStatus2) {
    var list = [];
    for (var i = 0, item; i < data.orders.length; i++) {
      item = data.orders[i];
      if (item.status === currentStatus1 || item.status === currentStatus2) {

      }
    }
    return list;
  },
  onChange(e) {
    var data = this.data;
    var that = this;
    var key = e.detail.key;
    var list;
    if (key == 1) {
      that.setData({
        previewOrders: data.orders
      });
    } else if (key == 2){
      list = that.findListByFilter(0, 1);
      that.setData({
        previewOrders: list
      });
    } else if (key == 3){
      list = that.findListByFilter(2);
      that.setData({
        previewOrders: list
      });
    } else if (key == 4){
      list = that.findListByFilter(3);
      that.setData({
        previewOrders: list
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的订单'
    });
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: app.globalData.base_url + '/orders/list',
      header: {
        "Content-Type": "applciation/json",
        "sessionid": app.globalData.sessionid
      },
      method: "GET",
      success: function(res){
        console.log(res);
        var orders = res.data.data.orders;
        for (var i = 0, item; i < orders.length; i++) {
          item = orders[i];
          // 0 待接单 1 待上门 2 待确认	3 已完成 4 已取消
          switch (item.status) {
            case 0:
              item.statusStr = '待接单';
              item.statusClass = 'text-red';
              break;
            case 1:
              item.statusStr = '待上门';
              item.statusClass = 'text-red';
              break;
            case 2:
              item.statusStr = '待确认';
              item.statusClass = 'text-normal';
              break;
            case 3:
              item.statusStr = '已完成';
              item.statusClass = 'text-gray';
              break;
            case 4:
              item.statusStr = '已取消';
              item.statusClass = 'text-gray';
              break;
          }
        }
        that.setData({
          orders: res.data.data.orders,
          previewOrders: res.data.data.orders
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