//app.js
App({
  onLaunch: function () {
    var that = this;
    that.wxLogin = function (user) {
      console.log(user);
      // 登录
      wx.login({
        success: res => {
          that.globalData.code = res.code;
          if (that.userSessionIdReadyCallback) {
            that.userSessionIdReadyCallback(res);
          }
          wx.request({
            method: 'POST',
            url: that.globalData.base_url + '/auth',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: res.code,
              rawData: user.rawData,
              signature: user.signature,
              encrypteData: user.encryptedData,
              iv: user.iv
            },
            success: sessionData => {
              console.log(sessionData);
              that.globalData.sessionid = sessionData.data.data.sessionid;
              wx.setStorage({
                key: 'sessionid',
                data: sessionData.data.data.sessionid
              });
              if (that.userSessionIdReadyCallback) {
                that.userSessionIdReadyCallback(sessionData.data.data.sessionid)
              }
            }
          });
        }
      });
    };

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: user => {
              console.log(user);
              that.globalData.userInfo = user.userInfo;
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(user)
              }
              wx.getStorage({
                key: 'sessionid',
                success (sessionData) {
                  that.globalData.sessionid = sessionData.data;
                  console.log(sessionData.data);
                },
                fail () {
                  that.wxLogin(user);
                }
              });
            }
          })
        }
      }
    })
  },
  globalData: {
    // base_url: 'http://rap2api.taobao.org/app/mock/118824',
    base_url: 'http://43.247.90.152:8081',
    sessionid: null,
    userInfo: null,
    openid: 'wx051b26a66be567e3',
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=',
    wx_url_2: '&grant_type=authorization_code',
  }
});