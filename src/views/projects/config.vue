<template>
  <div class="app-container">
    <el-row>
      <el-col :span="3">
        <el-button @click="addInput">button1</el-button>
      </el-col>
      <el-col :span="21">
        <div v-for="i in list ">
          <el-input type="primary" />
        </div>
        <div class="list1">
          <div
            v-for="(item,index) in list1"
            :key="index.id"
            class="cellmat"
          >
            {{ item }}
          </div>
        </div>
        -------
        <div class="list2">
          <div
            v-for="(item,index) in list2"
            :key="index.id"
            class="cellmat"
          >
            {{ item }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getBrick, delBrick } from '../../api/brick'
import draggable from 'vuedraggable'
import baseButton from '@/components/editor/base-button'
import baseInput from '@/components/editor/base-input'
import Sortable from 'sortablejs'

export default {

  components: { draggable, baseButton, baseInput },
  data() {
    return {
      inputValue: '',
      yyyy: '',
      list1: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 }
      ],
      list2: [
        { name: 'Juan', id: 5 },
        { name: 'Edgard', id: 6 },
        { name: 'Johnson', id: 7 }
      ],
      handle: true,
      currentWidget: 'baseButton',
      list: 10
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.get()
  },
  mounted() {

  },
  methods: {
    log: function(evt) {
      window.console.log(evt)
    },
    onUpEvent(e) {
      var item = this.list1[e.oldIndex]
      console.log(item)
      this.list1.splice(e.oldIndex, 1)
      this.list1.splice(e.newIndex, 0, item)
      console.log('拖动后的数据显示', this.list1)
    },
    addInput() {
      this.list++
      // this.handle = !this.handle
      // this.yyyy = `<el-input v-model="input" placeholder="请输入内容"></el-input>`

      // this.currentWidget = baseInput
      var $list1 = this.$el.querySelector('.list1')
      var $list2 = this.$el.querySelector('.list2')

      new Sortable.create($list1, {
        handle: '.cellmat',
        animation: 150,
        group: 'test',
        ghostClass: 'blue-background-class',
        onUpdate: (event) => {
          console.log('event值为：', event, event.newIndex, event.oldIndex)
          this.onUpEvent(event)
        }
      })

      new Sortable.create($list2, {
        handle: '.cellmat',
        animation: 150,
        group: 'test',
        ghostClass: 'blue-background-class',
        onUpdate: (event) => {
          console.log('event值为：', event, event.newIndex, event.oldIndex)
          this.onUpEvent(event)
        }
      })
    }

  }
}
</script>

<style lang="scss">
  .test-enter-active, .test-leave-active {
    transition: opacity .5s;
  }

  .test-enter, .test-leave-to {
    opacity: 0;
  }
</style>
