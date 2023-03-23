<script setup lang="ts">
import SlotSymbol from '../components/SlotSymbol.vue'

const props = defineProps<{
  column: { id: string, symbol: string, marked: boolean }[]
  index: number
}>()
</script>

<template>
  <TransitionGroup tag="div" name="slots">
    <SlotSymbol v-for="(row, index) in props.column" :key="row.id" 
      :symbol="row.symbol" :class="{ marked: row.marked }" :rows="props.column.length" :rowindex="index" :columnindex="props.index" />
  </TransitionGroup>    
</template>

<style scoped>
.slots-move {
  transition: all 0.3s ease-in;
  transition-delay: calc(0.4s + 0.1s * (7 - var(--row)));
}
.slots-enter-active {
  transition: all 0.5s ease-in;
  transition-delay: calc(0.05s * (7 - var(--row) + var(--column))); 
}
.slots-leave-active {
  transition: all 1s ease;
}


.slots-enter-from {
  opacity: 0;
  transform: translateY(-800px);
}
.slots-leave-to {
  opacity: 0;
  transform: scale(3) rotate(-20deg);  
}
.slots-leave-active {
  position: absolute;
}

</style>