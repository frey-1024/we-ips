import { $wuxSelect } from '../../dist/index'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    selectedValue: ''
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
      title: '装修效果图'
    });
  },
  onClick1() {
    $wuxSelect('#wux-select1').open({
      value: this.data.selectedValue,
      options: [
        '全部风格',
        '波西米亚风',
        '极简主义-轻奢风',
        '简欧风'
      ],
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          this.setData({
            selectedValue: value,
          })
        }
      },
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