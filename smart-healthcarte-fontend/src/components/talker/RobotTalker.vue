<template>
  <div class="robot-talker">
    <img
      src="https://smart-healthcare-zihoo.oss-cn-beijing.aliyuncs.com/asdfasdfsg.png"
      class="robot-avatar"
    />

    <!-- <div class="talker-message">您好，请简单描述您的症状，机器人将为您匹配相关科室~</div> -->
    <div class="talker-message">
      <span v-if="message">
        <span v-if="message.number == 1">{{ message.message }}</span>
        <span v-if="message.number == 2">
          根据您的描述，有以下几种推荐结果：<br />
          <ul>
            <li v-for="(info, index) in message.message" :key="index">
              您可能患有<strong>{{ info.name }}</strong
              >，建议前往<strong>{{ info.department }}</strong
              >做进一步检查
            </li>
          </ul>
          如需获取更准确的科室推荐，请进一步继续详细描述症状
        </span>
      </span>

      <div v-else class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="RobotTalker">
// 接收父组件参数
defineProps(['message'])
</script>
<style scoped lang="css">
.robot-talker {
  margin-top: 10px;
}
.robot-avatar {
  width: 30px;
  border-radius: 50%;
  float: left;
}

.talker-message {
  width: 500px;
  margin-left: 50px;
  background-color: aliceblue;
  padding: 10px;
  border-radius: 10px;
}
</style>
