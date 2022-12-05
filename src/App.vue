<template>
  <!-- 路由出口 -->
  <a-config-provider :locale="zh_CN">
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  data () {
    return {
      zh_CN: zhCN //使用中文包
    }
  }
}
</script>
