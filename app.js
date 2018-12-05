//app.js
App({
  onLaunch: function () {
    var that = this;
    that.wxLogin = function (user) {
      wx.removeStorage({key: 'sessionid'});
      that.globalData.phoneInfo = null;
      that.globalData.sessionid = null;
      if (that.removePhoneInfoCallback) {
        that.removePhoneInfoCallback();
      }

      // 登录
      wx.login({
        success: res => {
          console.log(res);
          that.globalData.code = res.code;
          if (that.userSessionIdReadyCallback) {
            that.userSessionIdReadyCallback(res);
          }
          wx.showLoading({
            title: '加载中...',
          });
          wx.request({
            method: 'POST',
            url: that.globalData.base_url + '/users/3rdsession',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: res.code,
              rawData: user.rawData,
              signature: user.signature,
              encryptedData: user.encryptedData,
              iv: user.iv
            },
            success: sessionData => {
              wx.hideLoading();
              console.log(sessionData, 'sessionData');
              if (sessionData.data.code !== 200) {
                wx.showToast({
                  title: (sessionData.data && sessionData.data.msg) || '获取用户信息失败' ,
                  icon: 'none',
                  duration: 2000
                });
                that.onLoad();
                return;
              }
              that.globalData.sessionid = sessionData.data.data.sessionid;
              wx.setStorage({
                key: 'sessionid',
                data: sessionData.data.data.sessionid
              });
              if (that.userSessionIdReadyCallback) {
                that.userSessionIdReadyCallback(sessionData.data.data.sessionid)
              }
            },
            fail: function(err){
              wx.hideLoading();
              wx.showToast({
                title: (err.data && err.data.msg) || '获取用户信息失败' ,
                icon: 'none',
                duration: 2000
              });
            },//请求失败
          });
        }
      });
    };

    that.getPhoneInfo = function (info, fn) {
      console.log(info);
      console.log(that.globalData, 'aaaaaaaaaaaaaaaa');
      wx.showLoading({
        title: '加载中...',
      });
      wx.request({
        method: 'POST',
        url: that.globalData.base_url + '/users/phone',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "sessionid": that.globalData.sessionid
        },
        data: {
          encryptedData: info.encryptedData,
          iv: info.iv
        },
        success: phoneData => {
          wx.hideLoading();
          console.log(phoneData, 'sessi/////////onid');
          if (phoneData.data.code !== 200) {
            console.log('aaaaa');
            wx.showToast({
              title: '获取手机号码失败, 请重试',
              icon: 'none',
              duration: 2000
            });
            that.getUserInfoBySetting(true);
            return;
          }
          console.log('get phone success////');
          that.globalData.phoneInfo = phoneData.data.data;
          if (that.userPhoneReadyCallback) {
            that.userPhoneReadyCallback(phoneData.data.data)
          }
          if (fn) {
            fn(phoneData.data.data);
          }
        },
        fail: function (err) {
          wx.hideLoading();
          wx.showToast({
            title: (err.data && err.data.msg) || '获取手机号码失败',
            icon: 'none',
            duration: 2000
          });
        },//请求失败
      });
    };
    that.getUserInfoBySetting = function(isRefresh) {
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
                if (!isRefresh) {
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
                } else {
                  that.wxLogin(user);
                }
              }
            })
          }
        }
      });
    };
    that.getUserInfoBySetting();
  },
  globalData: {
    // base_url: 'http://rap2api.taobao.org/app/mock/118824',
    // base_url: 'http://43.247.90.152:8081',
    base_url: 'https://wx.ipsinteriors.com/api',
    sessionid: null,
    userInfo: null,
    phoneInfo: null,
    openid: 'wx051b26a66be567e3',
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=',
    wx_url_2: '&grant_type=authorization_code',
  }
});