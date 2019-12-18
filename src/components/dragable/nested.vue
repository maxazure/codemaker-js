<template>
  <draggable class="dragArea" :list="tasks" :group="{ name: 'tasks' }">
    <div v-for="el in tasks" :key="el.name">
      <component :is="el.type" class="field" />

      <nested-draggable v-if="el.tasks" :tasks="el.tasks" />
    </div>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'NestedDraggable',
  components: {
    draggable
  },
  props: {
    tasks: {
      required: true,
      type: Array
    }
  }
}
</script>
<style scoped>
  .dragArea {
    min-height: 50px;
    outline: 1px dashed;
  }
</style>
