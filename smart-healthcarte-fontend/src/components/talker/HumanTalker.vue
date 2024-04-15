<template>
  <div class="human-talker">
    <img
      src="https://smart-healthcare-zihoo.oss-cn-beijing.aliyuncs.com/humanTalker.png"
      class="human-avatar"
    />

    <div class="talker-message">{{ message }}</div>
  </div>
</template>
<script setup lang="ts" name="HumanTalker">
// 接收组件参数
defineProps(['message'])
</script>
<style lang="css" scoped>
.human-talker {
  margin-top: 10px;
  overflow: hidden;
}

.human-avatar {
  width: 30px;
  float: right;
  border-radius: 50%;
}
.talker-message {
  background-color: aliceblue;
  margin-right: 20px;
  padding: 10px;
  border-radius: 10px;
  float: right;
}
</style>
