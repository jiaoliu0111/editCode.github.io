<template>
  <div class="home">
    <!-- 头部 -->
    <div class="header">
      <div class="login w">
        <span class="time">{{ currentTime }}</span>
        <div class="buttons">
          <a-button size="large" type="text" @click="handleLogin"
            >Sign In</a-button
          >
        </div>
      </div>
    </div>

    <!-- 主体 -->
    <div class="main">
      <Particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="particleConfig"
      />
    </div>

    <!-- 底部 -->
  </div>
</template>
<script>
import router from '@/router'
import particlejs from '@/assets/particles.json'
import { loadFull } from 'tsparticles'
import useTimer from '@/utils/useTimer'
export default {
  setup () {
    // 顶部时间
    const { YMD } = useTimer()
    const currentTime = YMD

    function handleLogin () {
      router.push('/list')
    }

    const particleConfig = particlejs

    const particlesInit = async engine => {
      await loadFull(engine)
    }

    const particlesLoaded = async container => {
      console.log('Particles container loaded', container)
    }

    return {
      currentTime,
      handleLogin,
      particleConfig,
      particlesInit,
      particlesLoaded
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  .header {
    background: #101010;
    .login {
      height: 90px;
      line-height: 90px;
      margin: 0 auto;
      .time {
        font-family: Helvetica, Arial, sans-serif;
        color: #fff;
      }
      .buttons {
        float: right;
      }
    }
  }
  .main {
    width: 100%;
    // min-height: 1000px;
    height: calc(100vh - 90px);
    background: #000;
    // background-position: center center;
    // background-repeat: no-repeat;
    // background-size: cover;
    // background-image: linear-gradient(
    //     270deg,
    //     rgba(176, 42, 42, 0.16) 0%,
    //     rgba(176, 42, 42, 0.56) 18.45%,
    //     rgba(176, 42, 42, 0.8) 49.67%,
    //     rgba(176, 42, 42, 0.56) 82.52%,
    //     rgba(176, 42, 42, 0.196364) 99.7%,
    //     rgba(189, 40, 40, 0) 99.71%,
    //     rgba(203, 56, 55, 0) 99.72%,
    //     rgba(203, 56, 55, 0.16) 99.73%
    //   ),
    //   url('../../assets/bg.png');
  }
  .ant-btn-text {
    color: #fff;
    &:hover {
      color: #999;
    }
  }
}
</style>
