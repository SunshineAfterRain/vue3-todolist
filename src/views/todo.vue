<template>
  <div class="contain">
    <div class="todolist">
      <h2>todolist</h2>
      <div class="todo-form">
        <a-input-search
          v-model:value="value"
          size="large"
          placeholder="请输入代办事项"
          @search="onSearch"
        >
          <template #enterButton>
            <a-button type="primary"> 添加</a-button>
          </template>
        </a-input-search>
      </div>
      <todo-filter @filterChange="filterChange"></todo-filter>
      <div v-if="filteredTodos.length > 0" class="todo-list">
        <transition-group name="list-complete">
          <div v-for="item in filteredTodos" :key="item.id" class="todo-item">
            <label for="" @click="finsh(item.id)">
              <div class="title" :class="[`${item.status}`]">
                <span class="text">
                  {{ item.title }}
                </span>
                <span class="status">
                  <a-tag :color="statusMap[item.status].status">
                    <template v-if="item.status == 'processing'" #icon>
                      <sync-outlined :spin="true" />
                    </template>
                    {{ statusMap[item.status].text }}
                  </a-tag>
                </span>
              </div>

              <div class="date">
                <span v-if="!item.finshTime"
                  >开始：{{ dayjs(item.createTime).format('M月DD日 HH时mm分') }}</span
                >
                <a-divider v-if="!item.finshTime" type="vertical" />
                <span v-if="item.finshTime"
                  >完成：{{ dayjs(item.finshTime).format('M月DD日 HH时mm分') }}</span
                >
                <a-divider type="vertical" />
                <span v-if="item.finshTime">
                  用时：{{ diffTime(item.createTime, item.finshTime) }}
                </span>
              </div>
            </label>
            <div class="action">
              <CheckCircleTwoTone
                v-if="item.status === 'processing'"
                two-tone-color="#52c41a"
                @click="finsh(item.id)"
              />
              <ThunderboltTwoTone
                v-if="item.status === 'undo'"
                two-tone-color="#108ee9"
                @click="start(item.id)"
              />
              <RestTwoTone @click="remove(item.id)" />
            </div>
          </div>
        </transition-group>
      </div>
      <div v-else style="margin-top: 30px">
        <a-empty></a-empty>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RestTwoTone, CheckCircleTwoTone, ThunderboltTwoTone } from '@ant-design/icons-vue'
import { defineComponent, reactive, ref, computed } from 'vue'
import { diffTime } from '../utils/utils'
import todoFilter from '@/components/todo/todo-filter.vue'
import dayjs from 'dayjs'

export default defineComponent({
  components: {
    RestTwoTone,
    CheckCircleTwoTone,
    ThunderboltTwoTone,
    todoFilter
  },
  setup() {
    const value = ref<string>('')
    let status = ref<string>('all')
    const list = window.localStorage.getItem('todolist')
    const statusMap: any = {
      done: {
        status: 'success',
        text: '已完成'
      },
      processing: {
        status: 'processing',
        text: '进行中'
      },
      undo: {
        status: 'error',
        text: '未开始'
      }
    }

    const todolist = reactive<any>((list && JSON.parse(list)) || [])

    const filteredTodos = computed(() => {
      switch (status.value) {
        case 'processing':
          return todolist.filter((item: any) => item.status === 'processing')
        case 'done':
          return todolist.filter((item: any) => item.status === 'done')
        case 'undo':
          return todolist.filter((item: any) => item.status === 'undo')
        default:
          return todolist
      }
    })

    const onSearch = (searchValue: string) => {
      if (!searchValue) {
        return
      }
      todolist.unshift({
        title: searchValue,
        id: todolist.length + 1,
        status: 'undo',
        createTime: dayjs()
      })
      value.value = ''
      savedata()
    }
    const remove = (id: number) => {
      let index = todolist.findIndex((item: any) => {
        return item.id == id
      })

      todolist.splice(index, 1)
      savedata()
    }
    const savedata = () => {
      window.localStorage.setItem('todolist', JSON.stringify(todolist))
    }
    const finsh = (id: number) => {
      let index = todolist.findIndex((item: any) => {
        return item.id == id
      })
      todolist[index].status = 'done'
      todolist[index].finshTime = dayjs()
      savedata()
    }

    const start = (id: number) => {
      let index = todolist.findIndex((item: any) => {
        return item.id == id
      })
      todolist[index].status = 'processing'
      savedata()
    }

    const filterChange = (e: any) => {
      status.value = e.target.value
    }
    return {
      status,
      statusMap,
      value,
      onSearch,
      remove,
      finsh,
      start,
      filteredTodos,
      dayjs,
      diffTime,
      filterChange
    }
  }
})
</script>
<style lang="less" scoped>
.list-complete-move {
  transition: transform 0.3s ease;
}
.list-complete-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.contain {
  background-color: #f4f6fd;
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
.todolist {
  width: 750px;
  margin: 100px auto 0;
  .todo-form {
    display: flex;
  }
  .filter {
    margin: 20px 8px 0 20px;
  }

  .todo-list {
    height: 600px;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
      border-radius: 10px;
    }
    .todo-item {
      margin: 20px;
      padding: 8px 15px;
      border-radius: 16px;
      border: 1px solid #f4f6fd;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2.4px 3.9px rgba(0, 0, 0, 0.021), 0 6.5px 10.9px rgba(0, 0, 0, 0.03),
        0 15.7px 26.2px rgba(0, 0, 0, 0.039), 0 52px 87px rgba(0, 0, 0, 0.06);
      transition: all 0.8s ease;
      .title {
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: 700;
        display: flex;
        align-items: center;

        &.done {
          .text {
            text-decoration: line-through;
            color: #999999;
          }
        }
      }
      .status {
        margin-left: 8px;
        display: flex;
        align-items: center;
        :deep(.ant-tag) {
          border-radius: 4px;
        }
      }
      .date {
        color: #999999;
      }
      .action {
        font-size: 30px;
        span {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
