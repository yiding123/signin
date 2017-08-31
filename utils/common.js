var computeAge = function (startDate) {
  console.log("---startDate:" + startDate);
  if (startDate == null) {
    return;
  }
  // 获得今天的时间
  var date = new Date();
  startDate = new Date(startDate);
  var newDate = date.getTime() - startDate.getTime();
  // 向下取整  例如 10岁 20天 会计算成 10岁
  // 如果要向上取整 计算成11岁，把floor替换成 ceil
  return Math.floor(newDate / 1000 / 60 / 60 / 24 / 365);
}

var transUserInfo = function (sessionUser) {
  return {
    role: sessionUser.角色,
    account: sessionUser.账号,
    id: sessionUser.主键,
    name: sessionUser.姓名
  };
}

/** 对Date的扩展，将 Date 转化为指定格式的String
  * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
  * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
  * 例子： 
  * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
  * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
  **/
var dateFormat = function (fmt, date) { //author: meizz 
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

// 计算距离
var getDistance = function (lat1, lng1, lat2, lng2) {
  function rad(d) {
    return d * Math.PI / 180.0
  }

  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a = radLat1 - radLat2;
  var b = rad(lng1) - rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;// EARTH_RADIUS;
  s = (Math.round(s * 10000) / 10000).toFixed(2);
  return s;
}

module.exports ={
  computeAge : computeAge,
  dateFormat : dateFormat,
  transUserInfo : transUserInfo,
  getDistance: getDistance
}