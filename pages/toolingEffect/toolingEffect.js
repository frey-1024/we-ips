var stringUtil = require('../../utils/stringUtil.js');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterList: stringUtil.toolEffectList(),
    filterEnList: stringUtil.toolEffectEnList(),
    imgNumberList: [36, 35, 73, 49],
    selectedIndex: 0,
    selectedText: stringUtil.toolEffectList()[0],
    user: null,
    selectedValue: '',
    previewList: [],
  },
  selectingFilter(e) {
    const val = e.detail.value;
    this.setData({
      selectedText: this.data.filterList[val],
      selectedIndex: val,
    });
    this.packagePreviewUrlList();
  },
  packagePreviewUrlList() {
    var that = this;
    var selectedIndex = that.data.selectedIndex;
    var filterEnList = that.data.filterEnList;
    var imgNumberList = that.data.imgNumberList;
    var baseImgUrl = app.globalData.base_img_url + '/industrydesign';
    var previewList = [], i, l, fileName, z;
    // 全部
    if (selectedIndex == 0) {
      for (i = 1, l = filterEnList.length, fileName; i <= l; i++) {
        fileName = filterEnList[i - 1];
        for (z = 1; z <= imgNumberList[i - 1]; z++) {
          previewList.push(baseImgUrl + '/' + i + '-' + fileName + '/' + fileName + z + '.jpg');
        }
      }
      that.setData({
        previewList: previewList,
      });
      return;
    }

    fileName = filterEnList[selectedIndex - 1];
    for (z = 1; z <= imgNumberList[selectedIndex -1]; z++) {
      previewList.push(baseImgUrl + '/' + selectedIndex + '-' + fileName + '/' + fileName + z + '.jpg');
    }
    that.setData({
      previewList: previewList,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '工装效果图'
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
    this.packagePreviewUrlList();
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