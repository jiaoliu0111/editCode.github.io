<template>
  <div class="list">
    <div class="header">
      <div class="content w">
        <code-sandbox-outlined style="color: #fff;font-size: 36px;"/>
        <a-button class="logout" size="large" type="text" @click="handleLogOut">Sign Up</a-button>
      </div>
    </div>
    <div class="main">
      <div class="container w">
        <div class="btns">
          <a-button type="primary" shape="round" size="large" @click="showModal"
            >新建</a-button
          >
        </div>
        <div v-if="list.length > 0" class="items">
          <div v-for="item in list" :key="item.index" class="itemBox">
            <Item :data="item" @refresh="refreshList"></Item>
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <!-- <Modal :modelValue="visible" @update:modelValue="visible.value = $event" @handleSubmit="submitData"/> -->
    <Modal
      :modelValue="visible"
      header="新建代码块"
      @update:modelValue="changeModalVisible"
      @handleSubmit="refreshList"
    />
  </div>
</template>
<script>
import { CodeSandboxOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import Item from './components/Item'
import Modal from './components/Modal'
import { ref } from 'vue'
import router from '@/router'
export default defineComponent({
  name: 'List',
  components: {
    Item,
    Modal,
    CodeSandboxOutlined
  },
  setup () {
    const visible = ref(false)

    const localData = JSON.parse(localStorage.getItem('PersonalCodes')) || []
    const list = ref(localData)

    const showModal = () => {
      visible.value = true
    }
    function changeModalVisible (val) {
      visible.value = val
    }
    function refreshList () {
      list.value = JSON.parse(localStorage.getItem('PersonalCodes')) || []
    }
    function handleLogOut () {
      router.push('/home')
    }

    return {
      visible,
      list,
      showModal,
      refreshList,
      changeModalVisible,
      handleLogOut
    }
  }
})
</script>
<style lang="less" scoped>
.list {
  .header {
    background: #101010;
    .content {
      height: 90px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .logout {
        margin: 0 0 0 auto;
      }
    }
  }
  .main {
    background: #f6f6f6;
    .container {
      margin: 0 auto;
      min-height: 1000px;
      .btns {
        display: flex;
        justify-content: end;
        padding: 10px 0;
        border-bottom: 2px solid #e01222;
      }
      .items {
        padding: 20px 0;
        display: flex;
        justify-content: flex-start;
        flex-flow: wrap;
        .itemBox {
          display: inline-block;
          margin: 20px;
          &:hover {
            transition: 0.2s;
            transform: scale(1.008);
          }
        }
      }
    }
  }
  .ant-btn-text {
    color: #fff;
  }
}
</style>
