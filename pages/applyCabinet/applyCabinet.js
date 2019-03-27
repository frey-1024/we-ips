var stringUtil = require('../../utils/stringUtil.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: '',
    address: '',
    contacts: '',
    phone: '',
    description: '',
  },
  goMapPage() {
    wx.navigateTo({
      url: '../mapSelect/mapSelect'
    })
  },
  onContactsChange(e) {
    this.setData({
      contacts: e.detail.value,
    });
  },
  onPhoneChange(e) {
    this.setData({
      phone: e.detail.value,
    });
  },
  onAddressChange(e) {
    this.setData({
      address: e.detail.value,
    });
  },
  onDetailChange(e) {
    this.setData({
      description: e.detail.value,
    });
  },
  alertErrorToast(tip) {
    wx.showToast({
      title: tip,
      icon: 'none',
      duration: 2000
    });
  },
  submitApply() {
    var that = this;
    var data = that.data;
    if (data.contacts === '') {
      that.alertErrorToast('请填写联系人');
      return;
    }
    if (data.phone === '') {
      that.alertErrorToast('请填写联系电话');
      return;
    }
    const isTel = (value) => /^1[34578]\d{9}$/.test(value);
    if (!isTel(data.phone)) {
      that.alertErrorToast('请填写正确的联系电话');
      return;
    }
    // if (data.area === '') {
    //   that.alertErrorToast('请选择所在区域');
    //   return;
    // }
    if (data.address === '') {
      that.alertErrorToast('请填写详细地址');
      return;
    }
    if (data.description === '') {
      that.alertErrorToast('请填写申请描述');
      return;
    }
    wx.showLoading({
      title: '提交中...',
    });
    wx.request({
      url: app.globalData.base_url + '/cupboard/apply',
      data:{
        phone: data.phone,
        contact: data.contacts,
        address: stringUtil.connAddress(data.area, data.address),
        description: data.description,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        wx.hideLoading();
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '申请失败，请重试');
        if (!aipStatus) {
          return;
        }
        wx.showToast({
          title: '申请成功',
          icon: 'success',
          duration: 3000
        });
        wx.navigateTo({
          url: '../applySuccess/applySuccess'
        });
      },
      fail: function(err){
        wx.hideLoading();
        wx.showToast({
          title: '申请失败，请重试',
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
    wx.setNavigationBarTitle({
      title: '橱柜申请'
    });
    if (app.globalData.phoneInfo) {
      this.setData({
        phone: app.globalData.phoneInfo.phoneNumber,
      });
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
    var that = this;
    wx.getStorage({
      key: 'address',
      success (res) {
        that.setData({
          area: res.data
        });
        wx.removeStorage({
          key: 'address',
        })
      }
    });
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
