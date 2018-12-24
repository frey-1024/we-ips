var stringUtil = require('../../utils/stringUtil.js');

const app = getApp();
var timer = null, timer2 = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterList: stringUtil.decorationImpressionList(),
    filterEnList: stringUtil.decorationImpressionEnList(),
    imgNumberList: [24, 24, 25, 52, 19, 32, 25, 29, 42, 34, 26],
    selectedIndex: 0,
    selectedText: stringUtil.decorationImpressionList()[0],
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
      selectedText: this.data.filterList[val],
      selectedIndex: val,
    });
    this.packagePreviewUrlList();
    this.loadMoreImages(); //初始化数据
  },
  packagePreviewUrlList() {
    var that = this;
    var selectedIndex = that.data.selectedIndex;
    var filterEnList = that.data.filterEnList;
    var imgNumberList = that.data.imgNumberList;
    var baseImgUrl = app.globalData.base_img_url + '/homedesign';
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
        dataList: [],
        firstList: [], //第一列数组
        secondList: [], //第二列数组
        topArr: [0, 0], //存储每列的累积top
      });
      return;
    }

    fileName = filterEnList[selectedIndex - 1];
    for (z = 1; z <= imgNumberList[selectedIndex -1]; z++) {
      previewList.push(baseImgUrl + '/' + selectedIndex + '-' + fileName + '/' + fileName + z + '.jpg');
    }
    that.setData({
      previewList: previewList,
      dataList: [],
      firstList: [], //第一列数组
      secondList: [], //第二列数组
      topArr: [0, 0], //存储每列的累积top
    });
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '装修效果图'
    });
  },
  loadMoreImages() {
    var that = this;
    var tmpArr = [];
    for (let i = that.data.dataList.length, l = that.data.previewList.length; i < l; i++) {
      var obj = {
        src: that.data.previewList[i],
        height: 0,
      };
      tmpArr.push(obj);
    }
    var dataList = this.data.dataList.concat(tmpArr);
    this.setData({ dataList: dataList });
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
        }, function () {
          that.loadMoreImages(); //初始化数据
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
