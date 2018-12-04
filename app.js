//app.js
App({
  onLaunch: function () {
    var that = this;
    this.wxLogin = function () {
      // 登录
      wx.login({
        success: res => {
          console.log(res);
          this.globalData.code = res.code;
          if (this.userSessionIdReadyCallback) {
            this.userSessionIdReadyCallback(res);
          }
        }
      });
    };
    this.wxLogin();

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    // base_url: 'http://rap2api.taobao.org/app/mock/118824',
    base_url: 'http://43.247.90.152:8081',
    userInfo: null,
    openid: 'wx051b26a66be567e3',
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=',
    wx_url_2: '&grant_type=authorization_code',
  }
});