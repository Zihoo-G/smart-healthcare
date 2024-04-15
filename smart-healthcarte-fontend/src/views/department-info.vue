<script setup lang="ts">
import { watch, onMounted, ref, toRef, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { getDepartmentInfo } from '@/api/department/index'
import { getSchedules } from '@/api/schedule/index'
import { appointmentApi } from '@/api/user/index'
import { type DepartmentInfo } from '@/api/department/types'
import { type ScheduleInfo } from '@/api/schedule/types'
import { useUserStore } from '@/stores/user'
import { Toast } from 'bootstrap'

const route = useRoute()
const userStore = useUserStore()
const days = ref(7)
const deptId = ref(2)
const departmentInfo = ref<DepartmentInfo>({})
const schedulesData = ref([])

const schedules = ref<ScheduleInfo[]>([])
const confirmationSchedule = ref<ScheduleInfo>({
  id: 0,
  date: new Date(),
  deptId: 0,
  did: 0,
  number: 0,
  doctor: {
    id: 0,
    name: '',
    sex: 1,
    type: '',
    url: '',
    uid: '',
    description: ''
  }
})
const date = ref()

let toast = ref()
function getDepartmentInfoData(value: number) {
  getDepartmentInfo(value).then((response) => {
    departmentInfo.value = response.data
  })
}

/**
 * 查询排班信息
 */
function getSchedulesData() {
  getSchedules(days.value, deptId.value).then((response) => {
    schedulesData.value = response.data

    if (date.value == undefined) {
      date.value = Object.keys(schedulesData.value)[0]
    }
    handleClick(schedulesData.value[date.value], date.value)
  })
}

function handleClick(schedule: any, index: number) {
  schedules.value = schedule
  date.value = index
}

const toastMessage = ref('')
/**
 * 挂号事件
 */
function handleRegistration(schedule: ScheduleInfo) {
  const userId = userStore.user.id ? userStore.user.id : 0
  console.log(userStore.user.id)
  if (userId === 0) {
    return
  }
  appointmentApi(schedule.id, userId).then((response) => {
    toastMessage.value = response.data
    toast.value.style.top = scrollY + 100 + 'px'

    new Toast(toast.value).show()
    // 更新内容
    getSchedulesData()
  })
}

/**
 * 处理点击预约按钮事件
 *  弹出确认框
 */
function handleConfirmation(schedule: ScheduleInfo) {
  confirmationSchedule.value = schedule
}
watch(
  () => route.params.id,
  (newValue, oldValue) => {
    if (newValue instanceof Array) {
      newValue = newValue[0]
    }

    deptId.value = parseInt(newValue)

    getDepartmentInfoData(deptId.value)
    getSchedulesData()
  }
)

onMounted(() => {
  getDepartmentInfoData(2)
  getSchedulesData()
})
</script>
<template>
  <div id="myToast" ref="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img src="..." class="rounded me-2" alt="..." />
      <strong class="me-auto">预约挂号小助手</strong>
      <small>现在</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">{{ toastMessage }}</div>
  </div>
  <div class="app-container">
    <div class="post-item">
      <h2 class="display-5 fw-bold pb-5 text-dark">{{ departmentInfo.name }}</h2>
      <p>
        {{ departmentInfo.description }}
      </p>

      <h2 class="my-5">科室预约</h2>
      <!-- 日期按钮 -->
      <div class="container" style="margin: 0 0 20px 0">
        <div class="row">
          <div class="col" v-for="(schedule, index) in schedulesData">
            <button
              type="button"
              class="btn btn-light"
              :class="{ 'button-activate': index == date }"
              @click="handleClick(schedule, index)"
            >
              {{ index }}
            </button>
          </div>
        </div>
      </div>
      <h3></h3>
      <div class="container" v-if="schedules.length === 0">暂无排班内容，请稍后查看</div>

      <div class="container" v-else>
        <div class="card" style="width: 18rem" v-for="(schedule, index) in schedules" :key="index">
          <img :src="schedule.doctor.url" class="card-img-top" alt="..." />
          <div class="card-body">
            剩余<span class="card-title title">{{ schedule.number }}</span
            >号
            <span class="sub-title">{{ schedule.doctor.type }}</span>
            <p class="card-text">
              {{ schedule.doctor.description }}
            </p>
            <button
              data-bs-toggle="modal"
              data-bs-target="#confirmationModal"
              class="btn btn-primary"
              @click="handleConfirmation(schedule)"
              :disabled="schedule.number <= 0"
            >
              挂号
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="confirmationModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">预约确认</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          确认预约{{ confirmationSchedule?.date.toString().substring(0, 10) }} 时间段的
          {{ confirmationSchedule?.doctor.name }}
          {{ confirmationSchedule?.doctor.type }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="handleRegistration(confirmationSchedule)"
            data-bs-dismiss="modal"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.title {
  font-weight: bold;
  color: black;
  font-size: 25px;
  margin: 0 5px 0 5px;
}
.sub-title {
  color: rgb(133, 133, 133);
  font-size: 15px;
  text-align: right;
}

.button-activate {
  background-color: #4c5354;
  color: #fff;
}

.toast-container {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
}

.toast {
  position: absolute;
  right: 0;
}
</style>
