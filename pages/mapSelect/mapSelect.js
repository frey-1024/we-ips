var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var timer = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    locationInfo: {},
    lat: 0,
    lng: 0,
    list: [],
    markers: []
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
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
          success: function(res) {
            that.setData({
              locationInfo: res.result
            });
          },
          fail: function(res) {
            console.log(res);
          }
        });
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
          }]
        });
      }
    })
  },
  onSearch(val) {
    var that = this;
    var searchVal = val.detail.value;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      if (searchVal != '' && searchVal.trim() != '') {
        // 调用接口
        qqmapsdk.search({
          keyword: searchVal,
          success: function (res) {
            var markers = [];
            for (var i = 0; i < res.data.length; i++) {
              var item = res.data[i];
              markers.push({
                id: item.id,
                latitude: item.location.lat,
                longitude: item.location.lng,
                width: 35,
                height: 45
              });
            }
            that.setData({
              list: res.data,
              lat: markers[0].latitude,
              lng: markers[0].longitude,
              markers: markers
            });
          },
          fail: function (res) {
            console.log(res);
          }
        })
      } else if (this.data.locationInfo) {
        var locationInfo = this.data.locationInfo.location;
        that.setData({
          lat: locationInfo.lat,
          lng: locationInfo.lng,
          markers: [{
            id: 0,
            latitude: locationInfo.lat,
            longitude: locationInfo.lng,
            width: 35,
            height: 45
          }]
        });
      }
    }, 200);
  },
  selectMyLocation() {
    var locationInfo = this.data.locationInfo;
    if (locationInfo) {
      this.goBackPage(locationInfo.address);
    }
  },
  selectSearchLocation(ev) {
    var id = ev.target.id;
    this.findInfoFromList(id);
  },
  onMapSelect(val) {
    var id = val.markerId;
    // 选择当前位置
    if (id == 0) {
      this.selectMyLocation();
      return;
    }
    this.findInfoFromList(id);
  },
  findInfoFromList(id) {
    var list = this.data.list;
    var findInfo;
    for (var i = 0, item; i < list.length; i++) {
      item = list[i];
      if (item.id === id) {
        findInfo = item;
        break
      }
    }
    if (findInfo) {
      this.goBackPage(findInfo.address);
    }
  },
  goBackPage(address) {
    wx.setStorage({
      key: 'address',
      data: address,
      success: function() {
        wx.navigateBack({
          delta: 1
        });
      }
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