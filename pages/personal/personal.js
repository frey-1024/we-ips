const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    phoneInfo: null,
    selectedBtn: null,
    isShowPhoneWarning: false,
    isShowAhturoizeWarning: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  goMyOrder() {
    wx.switchTab({
      url: '../myOrder/myOrder'
    })
  },
  goApplyDesign() {
    wx.navigateTo({
      url: '../applyDesign/applyDesign'
    });
  },
  goApplyMaterials() {
    wx.navigateTo({
      url: '../applyMaterials/applyMaterials'
    });
  },
  goApplyConstruction() {
    wx.navigateTo({
      url: '../applyConstruction/applyConstruction'
    });
  },
  goApplyCabinet() {
    wx.navigateTo({
      url: '../applyCabinet/applyCabinet'
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
        })
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
  getPhoneNumber(e) {
    var that = this;
    if (e.detail.errMsg.indexOf(':fail') > -1) {
      that.setData({
        isShowPhoneWarning: true
      });
    } else {
      app.getPhoneInfo(e.detail, function(phoneInfo) {
        app.globalData.phoneInfo = phoneInfo;
      });
    }
  },
  hidePhoneModal() {
    this.setData({
      isShowPhoneWarning: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心'
    });
    var that = this;
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        isShowAhturoizeWarning: false
      })
    } else {
      that.setData({
        isShowAhturoizeWarning: true
      });
      app.userInfoReadyCallback = (user) => {
        that.setData({
          userInfo: user.userInfo,
          isShowAhturoizeWarning: false,
        })
      };
      app.userSessionIdReadyCallback = res => {
        that.setData({
          isShowAhturoizeWarning: false
        })
      };
    }
    app.userNotAuthCallback = res => {
      that.setData({
        isShowAhturoizeWarning: true
      })
    }
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
    app.removePhoneInfoCallback = () => {
      this.setData({
        phoneInfo: null,
      });
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