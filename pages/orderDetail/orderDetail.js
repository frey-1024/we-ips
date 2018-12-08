var stringUtil = require('../../utils/stringUtil.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    tid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    wx.setNavigationBarTitle({
      title: '订单详情'
    });
    var tid = options.tid;
    that.setData({
      tid: options.tid
    });
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: app.globalData.base_url + '/repair/detail/apply/'+ tid,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method: "POST",
      success: function(res){
        wx.hideLoading();
        console.log(res);
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '获取详情失败，请重试');
        if (!aipStatus) {
          return;
        }
        var detail = data.data;
        var addressInfo = stringUtil.splitAddress(detail.address);
        detail.address = addressInfo.address;
        detail.area = addressInfo.area;
        detail.tid = tid;
        detail.typeStr =  stringUtil.typeList()[detail.type];
        detail.categoryStr =  stringUtil.categoryList()[detail.category];
        detail.tid = tid;
        // 订单状态 0 待接单 1 待上门 2 待确认	3 已完成 4 已取消
        switch (detail.status) {
          case 0:
            detail.statusImg = 'https://ips-source.oss-cn-hangzhou.aliyuncs.com/ipsimg/imgs/detail1.png';
            break;
          case 1:
            detail.statusImg = 'https://ips-source.oss-cn-hangzhou.aliyuncs.com/ipsimg/imgs/detail2.png';
            break;
          case 2:
            detail.statusImg = 'https://ips-source.oss-cn-hangzhou.aliyuncs.com/ipsimg/imgs/detail5.png';
            break;
          case 3:
            detail.statusImg = 'https://ips-source.oss-cn-hangzhou.aliyuncs.com/ipsimg/imgs/detail4.png';
            break;
          case 4:
            detail.statusImg = 'https://ips-source.oss-cn-hangzhou.aliyuncs.com/ipsimg/imgs/detail3.png';
            break;
        }
        that.setData({
          info: detail,
        });
      },
      fail: function(err){
        wx.hideLoading();
        wx.showToast({
          title: '加载失败，请重试',
          icon: 'none',
          duration: 3000
        });
      }
    })
  },
  cancelOrder() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定要取消订单吗？',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
          });

          wx.request({
            url: app.globalData.base_url + '/repair/cancel/' + that.data.tid,
            data:{
              ordernum: that.data.ordernum,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "sessionid": app.globalData.sessionid
            },
            method:"POST",
            success:function(res){
              wx.hideLoading();
              var data = res.data;
              var aipStatus = stringUtil.apiError(app, data.code, '删除失败，请重试');
              if (!aipStatus) {
                return;
              }
              wx.showToast({title: '删除成功', success: res => {
                that.setData({
                  info: {},
                  ordernum: ''
                });
                //用onLoad周期方法重新加载，实现当前页面的刷新
                that.onLoad()
              }});
              console.log(res);
              wx.navigateBack({
                delta: 1
              })
            },
            fail:function(err){
              wx.hideLoading();
            },//请求失败
          })
        } else if (res.cancel) {
        }
      }
    });
  },
  completeOrder() {
    wx.showLoading({
      title: '提交中...',
    });
    var that = this;
    wx.request({
      url: app.globalData.base_url + '/repair/complete/' + that.data.tid,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "sessionid": app.globalData.sessionid
      },
      method:"POST",
      success: function(res){
        wx.hideLoading();
        var data = res.data;
        var aipStatus = stringUtil.apiError(app, data.code, '删除失败，请重试');
        if (!aipStatus) {
          return;
        }
        wx.showLoading({
          title: '已确认完成',
        });
        wx.showToast({title: '已确认完成', success: res => {
          that.setData({
            info: {},
            ordernum: ''
          });
          //用onLoad周期方法重新加载，实现当前页面的刷新
          that.onLoad()
        }});
        console.log(res);
        wx.navigateBack({
          delta: 1
        })
      },
      fail:function(err){
        wx.hideLoading();
      },//请求失败
    })
  },
  goScore() {
    var that = this;
    wx.navigateTo({
      url: '../score/score?tid=' + that.data.tid
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