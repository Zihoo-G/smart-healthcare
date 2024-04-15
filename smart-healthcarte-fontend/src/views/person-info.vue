<template>
  <div class="app-container">
    <Icons />
    <Header />

    <section id="intro" style="background-color: #e8f0f1">
      <div class="container">
        <div class="banner-content padding-large">
          <h1 class="display-3 fw-bold text-dark">个人信息</h1>
          <span class="item"><a href="index.html" class="">主页</a></span> &nbsp;
          <span class="">/</span> &nbsp;
          <span class="item">个人信息</span>
        </div>
      </div>
    </section>

    <div class="container">
      <h2 class="mb-5">医生诊断结果</h2>

      <div v-for="(item, index) in checkList" :key="index">
        <h3 class="mb-3">{{ item.description }}</h3>
        <p>{{ item.params }}</p>
      </div>
    </div>

    <div class="container">
      <h2 class="mb-5">医生开具处方</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">药物名称</th>
            <th scope="col">数量</th>
            <th scope="col">总价</th>
            <th scope="col">状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in recipeList" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ item.dname }}</td>
            <td>{{ item.number }}</td>
            <td>{{ item.price }}</td>
            <td>
              <span v-if="item.isOutBound === 0" class="badge bg-info text-dark">未购买</span>
              <span v-else class="badge bg-success">已购买</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Footer />
  </div>
</template>
<script setup lang="ts" name="PersonInfo">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Icons from '../components/Icons.vue'
import { getCheckInfoByUserId, getCheckDetailInfo, getRecipe } from '@/api/user/index'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { type CheckInfo, type Recipe } from '@/api/user/types'

const userStore = useUserStore()
const checkList = ref<CheckInfo[]>([])
const recipeList = ref<Recipe[]>([])
const loading = ref(false)
function getCheckInfo() {
  console.log(userStore.user.id)

  if (!userStore.user.id) {
    console.log('用户未登录，请先登录')

    return
  }
  getCheckInfoByUserId(userStore.user.id).then((response) => {
    console.log(response)

    checkList.value = response.data
    for (let i = 0; i < response.data.length; i++) {
      console.log('description', checkList.value[i].description)

      getCheckDetailInfo(checkList.value[i].description).then((detailResponse) => {
        console.log(detailResponse)
        checkList.value[i].params = detailResponse.data.desc
      })
    }
  })
}

function getRecipeInfo() {
  if (!userStore.user.id) {
    console.log('用户未登录，请先登录')

    return
  }
  console.log('这里我也执行了哦')

  getRecipe(0, 10, userStore.user.id).then((response) => {
    recipeList.value = response.data
    console.log('这里是好东西', recipeList.value)
  })
}

onMounted(() => {
  getCheckInfo()
  getRecipeInfo()
  console.log('我执行这里了')
})
</script>
<style scoped lang="css">
.container {
  padding-top: 20px;
}
</style>
