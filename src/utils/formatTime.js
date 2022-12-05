import dayjs from "dayjs";

// 使用dayjs插件（按需）
import relativeTime from 'dayjs/plugin/relativeTime'

// 国际化
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

// 添加插件
dayjs.extend(relativeTime)

// 相对时间换算
export const relTime = (val) => {
    return dayjs().from(val)
}

// 绝对时间换算
export const formatTime = (time) => {
    return dayjs(time).format('YYYY年MM月DD日')
}
