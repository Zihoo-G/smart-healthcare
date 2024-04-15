<template>
  <div class="app-container">
    <Icons />
    <Header />

    <section id="intro" style="background-color: #e8f0f1">
      <div class="container">
        <div class="banner-content padding-large">
          <h1 class="display-3 fw-bold text-dark">科室推荐</h1>
          <span class="item"><a href="index.html" class="">主页</a></span> &nbsp;
          <span class="">/</span> &nbsp;
          <span class="item">科室推荐</span>
        </div>
      </div>
    </section>

    <div class="container talker">
      <component
        v-for="(message, index) in messages"
        :key="index"
        :is="Talk"
        :message="message"
      ></component>
    </div>

    <div class="container">
      <div class="talker-input">
        <div class="container">
          <div class="row">
            <div class="col-10">
              <input
                type="text"
                class="talker-input-message"
                placeholder="描述您的问题"
                v-model="inputInfo"
              />
            </div>
            <div class="col-2">
              <button
                class="btn btn-primary talker-input-button"
                type="submit"
                @click="submitQuestion"
              >
                发送
                <!-- <svg
            class="bi bi-chevron-right"
            width="32"
            height="32"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
            />
          </svg> -->
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
<script setup lang="ts" name="DpartmentRecommendation">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Icons from '../components/Icons.vue'
import RobotTalker from '../components/talker/RobotTalker.vue'
import HumanTalker from '../components/talker/HumanTalker.vue'
import Talk from '../components/talker/index.vue'
import { onMounted, reactive, ref } from 'vue'
import { type Message } from '../api/recommendation/types'
import { getRecommendDepartments } from '../api/recommendation/index'
const messages = reactive<Message[]>([])
const inputInfo = ref('')
/**
 * 点击按钮发送问题
 */
function submitQuestion() {
  console.log('我进入了')

  messages.push({ human: { message: inputInfo.value }, robot: { message: '', number: 2 } })

  getRecommendDepartments(inputInfo.value, '男', 32, 3)
    .then((response) => {
      if (response.data.length == 0) {
        messages[messages.length - 1].robot.message = '暂时还不能回答您的问题哦~'
      } else {
        messages[messages.length - 1].robot.message = response.data
      }
    })
    .finally(() => {
      inputInfo.value = ''
    })
}

/**
 * 页面加载时
 */
onMounted(() => {
  // 加载历史记录

  // 如果没有历史记录
  messages.push({
    robot: { message: '您好，请简单描述您的症状，机器人将为您匹配相关科室~', number: 1 }
  })
})
</script>
<style scoped lang="css">
.talker {
  margin-top: 20px;

  height: 300px;
  overflow: auto;
}
.talker-input {
  border: 2px solid rgb(111, 111, 111);
  border-radius: 10px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.talker-input-message {
  width: 100%;
  height: 40px;
  border: none;
}

.talker-input-message:focus {
  outline: none;
}
.talker-input-button {
  float: right;
}
</style>
