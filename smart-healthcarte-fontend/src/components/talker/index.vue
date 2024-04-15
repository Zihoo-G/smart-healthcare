<template>
  <HumanTalker
    v-if="message.human != null && message.human.message != ''"
    :message="message.human.message"
  />
  <RobotTalker :message="message.robot" />
</template>
<script setup lang="ts" name="Talk">
import RobotTalker from './RobotTalker.vue'
import HumanTalker from './HumanTalker.vue'

// 接收父组件数据
defineProps(['message'])
</script>
<style scoped lang="css"></style>
