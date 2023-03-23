<script setup lang="ts">
import ReactIcon from './icons/IconReact.vue'
import CPlusPlusIcon from './icons/IconCPlusPlus.vue'
import WordPressIcon from './icons/IconWordPress.vue'
import VincitDuckIcon from './icons/IconVincitDuck.vue'
import PythonIcon from './icons/IconPython.vue'
import NodeJSIcon from './icons/IconNodeJS.vue'
import RubyIcon from './icons/IconRuby.vue'
  const props = defineProps<{
    symbol: string,
    rows: number,
    rowindex: number,
    columnindex: number
  }>()
  const cssVars = () => {
    return {
      '--rows': props.rows,
      '--row': props.rowindex,
      '--column': props.columnindex
    }
  }
</script>

<template>
  <div class="slot-symbol" 
    :data-symbol="props.symbol" 
    :style="cssVars()">
    <ReactIcon v-if="props.symbol === 'J'" />
    <CPlusPlusIcon v-else-if="props.symbol === 'C'" />
    <VincitDuckIcon v-else-if="props.symbol === 'V'" />
    <RubyIcon v-else-if="props.symbol === 'R'" />
    <WordPressIcon v-else-if="props.symbol === 'W'" />
    <PythonIcon v-else-if="props.symbol === 'P'" />
    <NodeJSIcon v-else-if="props.symbol === 'N'" />
  </div>  
</template>

<style scoped>
.slot-symbol {
  height: 90px;
  width: 80px; 
  padding: 0;
}

.slot-symbol img {
  width: 80px !important;
}

.marked img {
  transition: filter .5s ease-out;
  filter: drop-shadow(0px 0px 13px #fff);
}

.slots-leave-active {
  bottom: calc(110px * (var(--rows) - var(--row) - 1) + 1px);
}
</style>

