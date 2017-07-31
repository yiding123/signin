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
    id: sessionUser.主键
  };
}

module.exports.computeAge = computeAge;
module.exports.transUserInfo = transUserInfo;