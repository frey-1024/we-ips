var stringUtil = require('../../utils/stringUtil.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */

  data: {
    phoneInfo: app.globalData.phoneInfo,
    isShowPhoneWarning: false,
    tid: '',
    brandFilterList: [],
    brandFilterListName: [],
    brandStyleFilterList: [],
    brandStyleFilterListName: [],
    selectedBrandIndex: '',
    selectedBrandText: '',
    selectedBrandStyleIndex: '',
    selectedBrandStyleText: '',
    previewList: null,
  },
  getIndex(val) {
    return val <= 0 ? '' : val;
  },
  selectingBrandFilter(e) {
    var that = this;
    const val = e.detail.value;
    this.setData({
      selectedBrandIndex: val,
      selectedBrandText: that.data.brandFilterListName[val],
    });
    this.packagePreviewUrlList('&brand='+that.getIndex(that.data.selectedBrandIndex)+'&style=' + that.getIndex(that.data.selectedBrandStyleIndex));
  },
  selectingBrandStyleFilter(e) {
    var that = this;
    const val = e.detail.value;
    this.setData({
      selectedBrandStyleIndex: val,
      selectedBrandStyleText: that.data.brandStyleFilterListName[val],
    });
    this.packagePreviewUrlList('&brand='+that.getIndex(that.data.selectedBrandIndex)+'&style=' + that.getIndex(that.data.selectedBrandStyleIndex));
  },
  packagePreviewUrlList(params) {
   var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    params = params || '';
    wx.request({
      url: app.globalData.base_url + '/materials/images?materialsId=' + that.data.tid + params,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        wx.hideLoading();
        console.log(res);
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '获取图片列表失败， 请重试');
        if (!aipStatus) {
          return;
        }
        that.setData({
          previewList: data.data.rows,
        });
      },
      fail: function(err){
        wx.hideLoading();
        wx.showToast({
          title: '获取图片列表失败， 请重试',
          icon: 'none',
          duration: 3000
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: options.name
    });
    that.setData({
      tid: options.tid
    });
    console.log(options);
    if (options.tid == 1) {
      that.getBrandFilterList();
      that.getBrandStyleFilterList();
      that.packagePreviewUrlList();
    } else {
      that.packagePreviewUrlList();
    }
  },
  getName(list) {
    var result = [];
    list.forEach((item) => {
      result.push(item.name);
    });
    return result;
  },
  getBrandFilterList() {
    var that = this;
    wx.request({
      url: app.globalData.base_url + '/materials/brands',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        console.log(res);
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '获取建材品牌失败');
        if (!aipStatus) {
          return;
        }
        var list = data.data;
        list.unshift({
          name: '全部',
          tid: -1
        });
        that.setData({
          brandFilterList: list,
          brandFilterListName: that.getName(list),
        });
      },
      fail: function(err){
        wx.showToast({
          title: '获取建材品牌失败',
          icon: 'none',
          duration: 3000
        });
      }
    })
  },
  getBrandStyleFilterList() {
    var that = this;
    wx.request({
      url: app.globalData.base_url + '/materials/styles',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        console.log(res);
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '获取建材款式失败');
        if (!aipStatus) {
          return;
        }
        var list = data.data;
        list.unshift({
          name: '全部',
          tid: -1
        });
        that.setData({
          brandStyleFilterList: list,
          brandStyleFilterListName: that.getName(list),
        });
      },
      fail: function(err){
        wx.showToast({
          title: '获取建材款式失败',
          icon: 'none',
          duration: 3000
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goApply() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: app.globalData.base_url + '/materials/applies?offset=0&limit=199999999',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        wx.hideLoading();
        console.log(res);
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '获取申请信息失败， 请重试');
        if (!aipStatus) {
          return;
        }
        var rows = data.data.rows;
        if (rows && rows.length) {
          wx.navigateTo({
            url: '../materialsDetail/materialsDetail?tid=' + rows[0].tid
          });
          return;
        }
        wx.navigateTo({
          url: '../applyMaterials/applyMaterials'
        });
      },
      fail: function(err){
        wx.hideLoading();
        wx.showToast({
          title: '获取申请信息失败， 请重试',
          icon: 'none',
          duration: 3000
        });
      }
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
        that.goApply();
      });
    }
  },
  hidePhoneModal() {
    this.setData({
      isShowPhoneWarning: false
    });
  },
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