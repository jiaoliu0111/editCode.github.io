<template>
  <a-modal
    :visible="modelValue"
    :title="header"
    width="1000px"
    destroyOnClose
    forceRender
    :maskClosable="false"
    :afterClose="closeModal"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <div class="textTitle">功能描述：</div>
    <a-input v-model:value="title" placeholder="请输入标题" />
    <div class="textTitle">代码片段：</div>
    <codemirror
      v-model="code"
      placeholder="Code gose here..."
      :autofocus="true"
      :indent-with-tab="true"
      :tabSize="2"
      :extensions="extensions"
      :style="{ height: '600px' }"
    />
    <!-- @ready="log('ready', $event)"
      @change="log('change', $event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)" -->
  </a-modal>
</template>

<script>
import { ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { message } from 'ant-design-vue'
export default {
  name: 'Modal',
  emits: ['update:modelValue', 'handleSubmit'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: '新建代码块'
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Codemirror
  },
  setup (props, { emit }) {
    let title = ref('')
    // const code = ref(`console.log('Hello, world!')`)
    const code = ref('')
    const extensions = [javascript(), oneDark]

    // 编辑时，数据回填
    if (props.data) {
      title.value = props.data.title
      code.value = props.data.code
    }

    function handleCancel () {
      emit('update:modelValue', false)
    }
    function handleOk () {
      if (!title.value.trim() || !code.value.trim())
        return message.warning({
          content: '标题和代码块不能为空！',
          duration: 0.8
        })

      let localData = JSON.parse(localStorage.getItem('PersonalCodes')) || []
      // 编辑
      if (props.header === '编辑代码块') {
        let i = localData.findIndex(item => item.index === props.data.index)
        const data = {
          index: props.data.index,
          title: title.value,
          code: code.value
        }
        localData.splice(i, 1, data)
      } else {
        // 新建
        let index = (localData[0] && localData[0].index + 1) || 0
        const data = { index, title: title.value, code: code.value }
        localData.unshift(data)
      }
      localStorage.setItem('PersonalCodes', JSON.stringify(localData))
      emit('handleSubmit')
      emit('update:modelValue', false)
    }

    // 关闭modal触发的方法
    function closeModal () {
      title.value = ''
      code.value = ''
    }

    return {
      handleCancel,
      handleOk,
      closeModal,
      title,
      code,
      extensions,
      log: console.log
    }
  }
}
</script>

<style lang="less" scoped>
.textTitle {
  font-weight: bold;
  padding: 5px;
}
</style>
