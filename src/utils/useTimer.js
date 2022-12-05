export default function timer () {
  // 获取当前时间
  var time_now = new Date()
  var year = time_now.getYear() + 1900 //年
  var month = time_now.getMonth() + 1 //月份
  var day = time_now.getDate() //日
  var hour = time_now.getHours() //小时
  var Min = time_now.getMinutes() //分钟
  var s = time_now.getSeconds() //秒
  if (s < 10) {
    //这个是说 秒如果小于10 前面加个0
    s = '0' + s
  }
  var welcome = '！'
  // 判断时间：0-12点上午 12点到18下午 其他时间是晚上
  if (hour >= 0 && hour < 12) {
    welcome = '上午好' + welcome
  } else if (hour >= 12 && hour <= 18) {
    welcome = '下午好' + welcome
  } else {
    welcome = '晚上好' + welcome
  }
  // 输出
  var YMDHms =
    '今天日期：' +
    year +
    '年' +
    month +
    '月' +
    day +
    '日' +
    '\xa0\xa0\xa0\xa0' +
    '现在时间：' +
    hour +
    '点' +
    Min +
    '分' +
    s +
    '秒' +
    '\xa0\xa0\xa0\xa0' +
    welcome

  let YMD =
    '今天日期：' +
    year +
    '年' +
    month +
    '月' +
    day +
    '日' +
    '\xa0\xa0\xa0\xa0' +
    welcome
  // document.getElementById("time").innerHTML=print;	//将print赋值给它
  return { YMDHms, YMD }
}
