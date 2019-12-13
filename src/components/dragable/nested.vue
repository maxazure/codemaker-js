<template>
  <draggable class="dragArea" tag="ul" :list="cols" :group="{ name: 'g1' }">
    <li v-for="el in cols" :key="el.name">
      <p>{{ el.name }}</p>
      <nested-draggable :cols="el.cols" />
    </li>
  </draggable>
</template>
<script>import draggable from 'vuedraggable'

export default {
  name: 'NestedDraggable',
  components: {
    draggable
  },
  props: {
    cols: {
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
