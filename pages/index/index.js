const app = getApp();

Page({
  data: {
    phoneInfo: app.globalData.phoneInfo,
    isShowAhturoizeWarning: false,
    isShowPhoneWarning: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  goAbout: function() {
    wx.navigateTo({
      url: '../about/about'
    });
  },
  goGoodDesign: function() {
    wx.navigateTo({
      url: '../goodDesign/goodDesign'
    });
  },
  goImportedCabinets: function() {
    wx.navigateTo({
      url: '../importedCabinets/importedCabinets'
    });
  },
  goInstalment: function() {
    wx.navigateTo({
      url: '../instalment/instalment'
    });
  },
  goApplyRepair: function() {
    wx.navigateTo({
      url: '../applyRepair/applyRepair'
    });
  },
  goHighTeam: function() {
    wx.navigateTo({
      url: '../highTeam/highTeam'
    });
  },
  goDecorationImpression: function() {
    wx.navigateTo({
      url: '../decorationImpression/decorationImpression'
    });
  },
  goImportedMaterials: function() {
    wx.navigateTo({
      url: '../importedMaterials/importedMaterials'
    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    var that = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      app.wxLogin(e.detail);
      app.userSessionIdReadyCallback = res => {
        that.setData({
          hasUserInfo: true
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
        wx.navigateTo({
          url: '../applyRepair/applyRepair'
        });
      });
    }
  },
  hidePhoneModal() {
    this.setData({
      isShowPhoneWarning: false
    });
  },
  onShow: function () {
    app.userPhoneReadyCallback = () => {
      if (app.globalData.phoneInfo) {
        this.setData({
          phoneInfo: app.globalData.phoneInfo,
        });
      }
    };
  },
});
