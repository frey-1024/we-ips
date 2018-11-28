import { $wuxSelect } from '../../dist/index'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    selectedBrand: '',
    selectedStyle: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.userInfo);
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo);
        that.setData({
          user: res.userInfo,
        })
      }
    });
    wx.setNavigationBarTitle({
      title: '进口瓷砖'
    });
  },
  selectingBrand() {
    $wuxSelect('#wux-select1').open({
      value: this.data.selectedBrand,
      options: [
        '全部',
        'Coem',
        'Cerdomus',
        'Caesar',
        'Refin',
        'Emigres',
        'Fioranese',
        'Marca corona',
        'Oranmenta',
        'Settecento'
      ],
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          this.setData({
            selectedBrand: value,
          })
        }
      },
    })
  },
  selectingStyle() {
    $wuxSelect('#wux-select2').open({
      value: this.data.selectedStyle,
      options: [
        '全部',
        '布纹',
        '大理石纹',
        '花砖',
        '经典',
        '木纹',
        '水磨石',
        '水泥面',
        '岩石',
        '异形砖'
      ],
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          this.setData({
            selectedStyle: value,
          })
        }
      },
    })
  },
  getDataByFilter() {
    var that = this;

    wx.request({
      url: 'test.php',
      data: {
        type: '',
        style: '',
      },
      header: {
        'sessionid': '444b8422ec9357120e4ca14a1f7f91f7',
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
      }
    })
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