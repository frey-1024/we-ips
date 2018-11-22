var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var util = require('../../utils/md5.js');
var qqmapsdk;
function caculateAKSN( $sk, $url, $querystring_arrays, $method){
  if ($method === 'POST'){
    ksort($querystring_arrays);
  }
  var $querystring = http_build_query($querystring_arrays);
  return util.hexMD5(urlencode($url + '?' + $querystring.$sk));
}
function caculateAKSN( $sk, $url, $querystring_arrays, $method = 'GET'){
  if ($method === 'POST'){
    ksort($querystring_arrays);
  }
//这个 querystring 汉字和部分字符会被 url 编码，所以在后面使用前应先反编码
  $querystring = http_build_query($querystring_arrays);
  return md5(urlencode($url.'?'. urldecode($querystring) . $sk));
}
var $querystring_arrays={
  "keyword": "酒店",
  "boundary": "nearby(39.908491,116.374328,1000)",
  "key": "7GUBZ-X6IKU-UNLVB-2FFA3-5BNM5-5PFMY"
};
caculateAKSN("7mW2LPFnPL4eIvkA63EZfhMRnRPeJXk", "https://apis.map.qq.com/ws/place/v1/search", $params, "GET")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: null,
    longitude: null,
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: '7GUBZ-X6IKU-UNLVB-2FFA3-5BNM5-5PFMY',
      SK: 'Af23EhbXpJTWuBSZ59b0CfQSwf3bMVO'
    });
// 页面加载获取当前定位位置为地图的中心坐标
    var _this = this;
    wx.getLocation({
      success(data) {
        if (data) {
          _this.data.markers = [{
            id:0,
            latitude: data.latitude,
            longitude: data.longitude,
            width: 32,
            height: 32
          }];
          _this.setData({
            latitude: data.latitude,
            longitude: data.longitude,
            markers:[{
              id:0,
              latitude: data.latitude,
              longitude: data.longitude,
              width: 32,
              height: 32
            }]
          });
        }
      }
    });
  },
  searchMap(rest) {
    const searchVal = rest.detail.value;
    console.log(searchVal);
    qqmapsdk.search({
      keyword: '酒店',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
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