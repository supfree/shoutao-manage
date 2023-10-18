export default {
  // 检测设备
  _isMobile() {
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
  },

  addTimes(m) {
    return m < 10 ? "0" + m : m;
  },

  // 处理时间
  traversalTime(date) {
    // var nowTime = new Date().getTime(); //获取当前时间的毫秒数
    // var diffence = (nowTime - date) / 1000; //与当前时间的秒差
    var time = new Date(date); //转为本地时间格式
    //var y = time.getFullYear(); //获取年份
    var m = time.getMonth() + 1; //获取月份
    var d = time.getDate(); //获取天
    //var h = time.getHours(); //获取小时
    //var mm = time.getMinutes(); //获取分钟
    //var s = time.getSeconds(); //获取秒钟
    //console.log(s);
    return [m, d];
    //   var getFullYear =
    //   y +
    //   "-" +
    //   this.addTimes(m) +
    //   "-" +
    //   this.addTimes(d) +
    //   " " +
    //   this.addTimes(h) +
    //   ":" +
    //   this.addTimes(mm);
    // if (diffence < 30) {
    //   return "刚刚";
    // } else if (diffence / 60 < 60) {
    //   return Math.round(diffence / 60) + "分钟前";
    // } else if (diffence / 60 / 60 < 24) {
    //   return Math.round(diffence / 60 / 60) + "小时前";
    // } else if (diffence / 60 / 60 < 48) {
    //   return "两天前";
    // } else {
    //   return getFullYear;
    // }
  },
};
