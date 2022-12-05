<template>
  <a-card :title="data.title" :bordered="false">
    <codemirror v-model="data.code"  disabled placeholder="Code gose here..." />
    <template #actions>
      <!-- <share-alt-outlined key="share" style="color: #6b5aff" /> -->
      <edit-outlined key="edit" @click="handleEdit" style="color: #47a3ff" />
      <play-circle-outlined
        key="run"
        style="color: #2eb85c"
        @click="handleRun(data.code)"
      />
      <a-popconfirm
        title="您确定要删除吗？"
        ok-text="是"
        cancel-text="否"
        @confirm="handleDel(data.index)"
      >
        <delete-outlined key="delete" style="color: #e55353" />
      </a-popconfirm>
    </template>
  </a-card>
  <!-- Modal 编辑组件-->
  <Modal
    v-if="visible"
    :modelValue="visible"
    header="编辑代码块"
    :data="data"
    @update:modelValue="changeVisible"
    @handleSubmit="refresh"
  ></Modal>
</template>

<script>
import {
  EditOutlined,
  PlayCircleOutlined,
  ShareAltOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import Modal from './Modal'
import { ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
export default defineComponent({
  components: {
    EditOutlined,
    PlayCircleOutlined,
    ShareAltOutlined,
    DeleteOutlined,
    Modal,
    Codemirror
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['refresh'],
  setup (props, { emit }) {
    // 控制编辑model的显示与隐藏
    const visible = ref(false)
    function handleEdit () {
      visible.value = true
    }
    function handleDel (index) {
      // console.log('当前点击的index：', index)
      const newData = JSON.parse(localStorage.getItem('PersonalCodes')).filter(
        item => item.index !== index
      )
      localStorage.setItem('PersonalCodes', JSON.stringify(newData))
      emit('refresh')
    }
    function changeVisible (val) {
      visible.value = val
    }
    function refresh () {
      emit('refresh')
    }
    function handleRun (code) {
      var cmd = new ActiveXObject('WScript.Shell')
      cmd.run(code) //百度搜索cmd多命令行一起写
      cmd = null
      window.setTimeout('window.close();', 3000)
    }
    return { handleEdit, handleDel, visible, changeVisible, refresh, handleRun }
  }
})
</script>
<style lang="less" scoped>
.ant-card {
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
}
:deep(.ant-card-body) {
  height: 200px;
  overflow: auto;
  pointer-events: none;
  overflow-y: hidden;
}
</style>
