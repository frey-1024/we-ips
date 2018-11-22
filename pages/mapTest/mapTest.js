var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;



Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: 'aa',
    lat: 0,
    lng: 0,
    list: [],
    markers: [],
    hasMarkers: false//解决方案
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'SAFBZ-JWAK4-C6FUX-XTGLH-AVJBS-64FKK',
    });
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log(res);
        // success
        that.setData({
          lat: res.latitude,
          lng: res.longitude,
          markers: [{
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 35,
            height: 45
          }],
          hasMarkers: true//解决方案
        });
      }
    })
  },
  onMyChange(val) {
    console.log(val);
    this.setData({
      msg: 'bbb'
    });
  },
  onSearch(val) {
    var that = this;
    var searchVal = val.detail.value;
    if (searchVal != '' && searchVal.trim() != '') {
      that.setData({
        hasMarkers: false
      });
      // 调用接口
      qqmapsdk.search({
        keyword: searchVal,
        success: function (res) {
          console.log(res);
          var list = [];
          for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i];
            list.push({
              id: item.id,
              latitude: item.location.lat,
              longitude: item.location.lng,
              width: 35,
              height: 45
            });
          }
          console.log(list);
          that.setData({
            markers: list,
            hasMarkers: true
          });
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
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