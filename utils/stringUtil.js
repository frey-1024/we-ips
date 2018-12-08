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
  alertErrorToast(msg);
  switch (code) {
    // sessionId 过期
    case 403:
      app.getUserInfoBySetting(true);
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

function decorationImpressionList() {
  return [
    '全部',
    '波西米亚风',
    '极简主义-轻奢风',
    '简欧风',
    '美式复古风',
    '美式现代风',
    '奢华时尚新古典风',
    '时尚简约现代风',
    '田园风',
    '现代复试风',
    '现代新古典风',
    '现代新中式风',
  ];
}

function cabinetsList() {
  return [
    '全部',
    '传统风',
    '当代',
    '地中海',
    '工业风',
    '简约风',
    '维多利亚风',
  ];
}
function decorationImpressionEnList() {
  return [
    'bohemia',
    'miniextra',
    'simpleEuropean',
    'Americanretro',
    'Americanmodern',
    'fashionclassic',
    'fashionsimplicity',
    'pastoral',
    'modernduplex',
    'Modernclassic',
    'modernChinese',
  ];
}

function toolEffectList() {
  return [
    '全部',
    '办公室',
    '酒店住宅',
    '零售餐饮',
    '银行'
  ];
}
function toolEffectEnList() {
  return [
    'office',
    'hotel',
    'restaurant',
    'bank'
  ];
}

function brandList() {
  return [
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
  ];
}


function brandStyleList() {
  return [
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
  ];
}

module.exports = {
  splitAddress: splitAddress,
  connAddress: connAddress,
  alertErrorToast: alertErrorToast,
  apiError: apiError,
  categoryList: categoryList,
  typeList: typeList,
  decorationImpressionList: decorationImpressionList,
  decorationImpressionEnList: decorationImpressionEnList,
  toolEffectList: toolEffectList,
  toolEffectEnList: toolEffectEnList,
  brandList: brandList,
  brandStyleList: brandStyleList,
  cabinetsList: cabinetsList,
};
