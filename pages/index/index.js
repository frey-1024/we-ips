//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    isShowAhturoizeWarning: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  goAbout: function() {
    wx.navigateTo({
      url: '../about/about'
    });
  },
  goApplyRepair: function() {
    wx.navigateTo({
      url: '../applyRepair/applyRepair'
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
      this.setData({
        hasUserInfo: true
      })
    } else {
      that.setData({
        isShowAhturoizeWarning: true
      });
    }
  },
  getAuthorize(e) {
    this.getUserInfo(e);
  },
  hideModal() {
    this.setData({
      isShowAhturoizeWarning: false
    });
  }
});
