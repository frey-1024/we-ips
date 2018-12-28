var stringUtil = require('../../utils/stringUtil.js');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneInfo: app.globalData.phoneInfo,
    isShowPhoneWarning: false,
    filterList: stringUtil.cabinetsList(),
    selectedIndex: 0,
    selectedText: stringUtil.cabinetsList()[0],
    previewList: null,

    dataList: [],
    firstList: [], //第一列数组
    secondList: [], //第二列数组
    windowWidth: 0, //页面视图宽度
    windowHeight: 0, //视图高度
    imgMargin: 6, //图片边距: 单位px
    imgWidth: 0,  //图片宽度: 单位px
    topArr: [0, 0], //存储每列的累积top
  },
  selectingFilter(e) {
    const val = e.detail.value;
    this.setData({
      dataList: [],
      firstList: [], //第一列数组
      secondList: [], //第二列数组
      topArr: [0, 0], //存储每列的累积top
      selectedText: this.data.filterList[val],
      selectedIndex: val,
    });
    this.packagePreviewUrlList();
  },
  packagePreviewUrlList() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    var style = that.data.selectedIndex === 0 ? '' : that.data.selectedIndex;
    wx.request({
      url: app.globalData.base_url + '/cupboard/list?offset=0&limit=199999999&style=' + style,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        wx.hideLoading();
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '获取图片列表失败， 请重试');
        if (!aipStatus) {
          return;
        }
        that.setData({
          previewList: data.data.rows,
        });
        that.loadMoreImages(data.data.rows); //初始化数据
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
  /**预览图片 */
  previewImg: function (e) {

    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;

    var currentSrc = '';

    if (type == 1){
      currentSrc = this.data.firstList[index].src;
    }
    else{
      currentSrc = this.data.secondList[index].src;
    }

    wx.previewImage({
      urls: [currentSrc],
    })
  },
  //加载图片
  loadImage: function (e) {
    var index = e.currentTarget.dataset.index; //图片所在索引
    var imgW = e.detail.width, imgH = e.detail.height; //图片实际宽度和高度
    var imgWidth = this.data.imgWidth; //图片宽度
    var imgScaleH = imgWidth / imgW * imgH; //计算图片应该显示的高度

    var dataList = this.data.dataList;
    var margin = this.data.imgMargin;  //图片间距

    //第一列的累积top，和第二列的累积top
    var firtColH = this.data.topArr[0], secondColH = this.data.topArr[1];
    var firstList = this.data.firstList, secondList = this.data.secondList;
    var obj = dataList[index];

    obj.height = imgScaleH;

    if (firtColH <= secondColH) { //表示新图片应该放到第一列
      firtColH += margin + obj.height;
      firstList.push(obj);
    }
    else { //放到第二列
      secondColH += margin + obj.height;
      secondList.push(obj);
    }

    this.setData({
      dataList: dataList,
      firstList: firstList,
      secondList: secondList,
      topArr: [firtColH, secondColH],
    });
  },
  loadMoreImages() {
    var that = this;
    var prevDataList = that.data.dataList;
    var previewList = that.data.previewList;
    var tmpArr = [];
    for (let i = prevDataList.length, l = i + 11; i < l; i++) {
      if (i >= previewList.length) {
        break;
      }
      var obj = {
        src: previewList[i].imglink,
        height: 0,
      };
      tmpArr.push(obj);
    }
    var dataList = prevDataList.concat(tmpArr);
    this.setData({ dataList: dataList });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '进口橱柜'
    });
    that.packagePreviewUrlList();
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
      url: app.globalData.base_url + '/cupboard/applies?offset=0&limit=199999999',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        wx.hideLoading();
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '获取申请信息失败， 请重试');
        if (!aipStatus) {
          return;
        }
        var rows = data.data.rows;
        if (rows && rows.length) {
          wx.navigateTo({
            url: '../cabinetsDetail/cabinetsDetail?tid=' + rows[0].tid
          });
          return;
        }
        wx.navigateTo({
          url: '../applyCabinet/applyCabinet'
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


    var that = this;
    //获取页面宽高度
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var imgMargin = that.data.imgMargin;
        //两列，每列的图片宽度
        var imgWidth = (windowWidth - imgMargin * 3) / 2;

        that.setData({
          windowWidth: windowWidth,
          windowHeight: res.windowHeight,
          imgWidth: imgWidth
        });
      },
    })
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
