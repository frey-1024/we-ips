var uploadImage = require('../../libs/uploadFile.js');
var util = require('../../libs/util.js');
var stringUtil = require('../../utils/stringUtil.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPreviewDetail: false,
    imgList: [],
    budgetList: ['20-50万', '50-100万', '100万以上'],
    area: '',
    contacts: '',
    phone: '',
    selectedBudget: '',
    selectedBudgetIndex: '',
  },
  goMapPage() {
    wx.navigateTo({
      url: '../mapSelect/mapSelect'
    })
  },
  selectingBudget(e) {
    var that = this;
    const val = e.detail.value;
    this.setData({
      selectedBudget: that.data.budgetList[val],
      selectedBudgetIndex: val,
    });
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
  clearImg(e) {
    var deleteIndex = e.target.dataset.index;
    var list = this.data.imgList;
    list.splice(deleteIndex, 1);
    this.setData({
      imgList: list
    });
  },
  //选择照片
  joinPicture(){
    var that = this;
    var imgListLength = that.data.imgList.length;
    if (imgListLength >= 3) {
      return;
    }
    wx.chooseImage({
      count: 3 - imgListLength, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var nowTime = util.formatTime(new Date());

        //支持多图上传
        for (var i = 0; i < tempFilePaths.length; i++) {
          //显示消息提示框
          wx.showLoading({
            title: '上传中...',
            mask: true
          });
          uploadImage(tempFilePaths[i], 'cbb/' + nowTime + '/',
            function (result) {
              wx.hideLoading();
              var imgList = that.data.imgList;
              imgList.push(result);
              that.setData({
                imgList: imgList,
              });
            }, function () {
              wx.hideLoading();
              that.alertErrorToast('上传图片失败，请重试');
            }
          )
        }
      },
      fail: function (err) {
        that.alertErrorToast('上传图片失败，请重试');
      },
      complete: function (e) {}
    })
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
    if (data.area === '') {
      that.alertErrorToast('请选择所在区域');
      return;
    }
    if (data.address === '') {
      that.alertErrorToast('请填写详细地址');
      return;
    }
    if (data.selectedBudgetIndex === '') {
      that.alertErrorToast('请选择装修预算');
      return;
    }
    if (!data.imgList.length) {
      that.alertErrorToast('请上传图片');
      return;
    }
    wx.showLoading({
      title: '提交中...',
    });
    wx.request({
      url: app.globalData.base_url + '/design/apply',
      data:{
        budget: data.selectedBudgetIndex,
        phone: data.phone,
        contact: data.contacts,
        address: stringUtil.connAddress(data.area, data.address),
        imgs: data.imgList,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        wx.hideLoading();
        console.log(res);
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
      title: '设计申请'
    });
    console.log(app.globalData.phoneInfo);
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