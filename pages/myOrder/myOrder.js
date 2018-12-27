var stringUtil = require('../../utils/stringUtil.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    previewOrders: null,
    current: '1',
    isShowAhturoizeWarning: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  findListByFilter(currentStatus1, currentStatus2, currentStatus3) {
    var data = this.data;
    var list = [];
    for (var i = 0, item; i < data.orders.length; i++) {
      item = data.orders[i];
      if (item.status === currentStatus1 || item.status === currentStatus2 || item.status === currentStatus3) {
        list.push(item);
      }
    }
    return list;
  },
  showPreview(that, key) {
    var data = this.data;
    var list;
    // 订单状态 0 待接单 1 待上门 2 待确认	3 已完成 4 已取消
    if (key == 1) {
      that.setData({
        previewOrders: data.orders
      });
    } else if (key == 2){
      list = that.findListByFilter(0, 1, 2);
      that.setData({
        previewOrders: list
      });
    } else if (key == 3){
      list = that.findListByFilter(3, 5);
      that.setData({
        previewOrders: list
      });
    } else if (key == 4){
      list = that.findListByFilter(4);
      that.setData({
        previewOrders: list
      });
    }
  },
  onChange(e) {
    var that = this;
    var key = e.detail.key;
    this.setData({
      current: key,
    });
    this.showPreview(that, key);
  },
  alertErrorToast(tip) {
    wx.showToast({
      title: tip,
      icon: 'none',
      duration: 2000
    });
  },
  getUserInfo: function(e) {
    var that = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      that.setData({
        userInfo: e.detail.userInfo,
      });
      app.wxLogin(e.detail);
      app.userSessionIdReadyCallback = res => {
        that.setData({
          isShowAhturoizeWarning: false
        });
        that.getList();
      };
    } else {
      that.setData({
        isShowAhturoizeWarning: true
      });
    }
  },
  hideModal() {
    this.setData({
      isShowAhturoizeWarning: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的订单'
    });
    var that = this;
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        isShowAhturoizeWarning: false
      });
    } else {
      that.setData({
        isShowAhturoizeWarning: true
      });
      app.userInfoReadyCallback = (user) => {
        that.setData({
          userInfo: user.userInfo,
          isShowAhturoizeWarning: false,
        });
        that.getList();
      };
      app.userSessionIdReadyCallback = res => {
        that.setData({
          isShowAhturoizeWarning: false
        });
        that.getList();
      };
    }
    app.userNotAuthCallback = res => {
      that.setData({
        isShowAhturoizeWarning: true
      })
    }
  },
  goOrderDetail(e) {
    const tid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?tid=' + tid
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
    if (app.globalData.sessionid) {
      this.getList();
    }
  },

  getList() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    that.setData({
      current: '1',
    });
    wx.request({
      url: app.globalData.base_url + '/repair/applies?offset=0&limit=199999999',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        var data = res.data;
        if (data.code !== 200) {
          that.alertErrorToast('获取列表失败，请重试');
          return;
        }
        var orders = data.data.rows;
        for (var i = 0, item; i < orders.length; i++) {
          item = orders[i];
          const addressInfo = stringUtil.splitAddress(item.address);
          item.address = addressInfo.address;
          item.area = addressInfo.area;
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
            case 5:
              item.statusStr = '已完成';
              item.statusClass = 'text-gray';
              break;
          }
        }
        that.setData({
          orders: orders,
        });
        that.showPreview(that, "1");
      },
      fail: function(err){
        that.alertErrorToast(err.msg || '获取列表失败，请重试');
      },//请求失败
      complete: function(){
        wx.hideLoading();
      }//请求完成后执行的函数
    })
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
