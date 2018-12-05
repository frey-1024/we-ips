const splitCode = '@@##%%';

function splitAddress(val) {
  if (!val) {
    return {};
  }
  const arr = val.split(splitCode);
  if (arr.length > 1) {
    return {
      address: arr[1],
      area: arr[0]
    }
  } else if (arr.length){
    return {
      area: arr[0]
    }
  }
  return {};
}
function connAddress(val1, val2) {
  val1 = val1 || '';
  val2 = val2 || '';
  return val1 + splitCode + val2;
}

function alertErrorToast(tip) {
  wx.showToast({
    title: tip,
    icon: 'none',
    duration: 2000
  });
}

function apiError(app, code, msg) {
  if (code === 200) {
    return true;
  }
  switch (code) {
    // sessionId 过期
    case 403:
      app.getUserInfoBySetting(true);
      alertErrorToast(msg);
      return false;
    default:
      return false;
  }
}

function categoryList() {
  return [
    '开关电路',
    '厨卫',
    '开锁换锁',
    '阀门龙头',
    '门窗',
    '墙面地面',
    '打孔疏通',
    '灯具',
    '家具',
    '家电',
    '其他',
  ];
}

function typeList() {
  return [
    '个人',
    '企业'
  ];
}

module.exports = {
  splitAddress: splitAddress,
  connAddress: connAddress,
  alertErrorToast: alertErrorToast,
  apiError: apiError,
  categoryList: categoryList,
  typeList: typeList,
};
