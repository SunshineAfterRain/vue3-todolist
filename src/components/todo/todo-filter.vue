<template>
  <div class="filter">
    <a-radio-group @change="$emit('filterChange', $event)">
      <a-radio-button v-for="item in filter" :key="item.label" :value="item.value">{{
        item.label
      }}</a-radio-button>
    </a-radio-group>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  setup() {
    const filter = [
      {
        label: '全部',
        value: 'all'
      },
      {
        label: '进行中',
        value: 'processing'
      },
      {
        label: '已完成',
        value: 'done'
      },
      {
        label: '未完成',
        value: 'undo'
      }
    ]
    return { filter }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped></style>
