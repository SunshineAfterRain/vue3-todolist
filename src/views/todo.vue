<template>
  <div class="contain">
    <div class="todolist">
      <h2>todolist</h2>
      <div class="todo-form">
        <a-input-search
          size="large"
          v-model:value="value"
          placeholder="input search text"
          @search="onSearch"
        >
          <template #enterButton>
            <a-button type="primary"> 添加</a-button>
          </template>
        </a-input-search>
      </div>
      <div class="todo-list">
        <div class="todo-item" v-for="(item, index) in todolist" :key="item">
          <label for="">
            <a-checkbox>
              {{ item }}
            </a-checkbox>
          </label>

          <a-button @click="remove(index)">
            删除
            <CloseOutlined />
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CloseOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  components: {
    CloseOutlined
  },
  setup() {
    const value = ref('')
    const list = window.localStorage.getItem('todolist')

    const todolist = reactive<any>((list && JSON.parse(list)) || [])
    const onSearch = (searchValue: string) => {
      console.log(value.value)
      todolist.push(searchValue)
      value.value = ''
      savedata()
    }
    const remove = (index: number) => {
      todolist.splice(index, 1)
      savedata()
    }
    const savedata = () => {
      window.localStorage.setItem('todolist', JSON.stringify(todolist))
    }
    return {
      todolist,
      value,
      onSearch,
      remove
    }
  }
})
</script>
<style lang="less" scoped>
.contain {
  background-color: #adbaeb;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.todolist {
  width: 750px;
  margin: 100px auto 0;
  .todo-form {
    display: flex;
  }
  .todo-list {
    .todo-item {
      margin: 20px;
      padding: 15px 30px;
      border-radius: 18px;
      border: 1px solid #f4f6fd;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
