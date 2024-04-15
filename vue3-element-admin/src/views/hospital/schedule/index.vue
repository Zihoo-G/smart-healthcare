<template>
  <div id="app-container">
    <el-row :gutter="20">
      <el-col :lg="4" :xs="24" class="mb-[12px]">
        <DeptTree @node-click="querySchedule"></DeptTree>
      </el-col>

      <el-col :lg="20" :xs="24">
        <el-timeline style="max-width: 600px">
          <el-timeline-item
            v-for="(item, index) in scheduleDoctors"
            :key="index"
            :timestamp="index.toString()"
            placement="top"
          >
            <DoctorCard
              v-for="(child, idx) in item"
              :key="idx"
              :info="child.doctor"
              :number="child.number"
            />
            <el-button
              type="success"
              :icon="Edit"
              circle
              @click="openDialog(index)"
            />
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>

    <!-- 添加排班信息 -->
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="500px"
      @close="closeDialog"
    >
      <el-form
        ref="roleFormRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="医生" prop="ids">
          <el-select
            v-model="formData.doctorIds"
            multiple
            placeholder="选择医生"
            style="width: 240px"
          >
            <el-option
              v-for="item in deptDoctorList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="预约挂号数量" prop="number">
          <el-input
            v-model="formData.number"
            placeholder="请输入预约挂号数量"
          />
        </el-form-item>

        <el-form-item label="日期" prop="date">
          <el-input v-model="formData.date" placeholder="请输入日期" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { Edit } from "@element-plus/icons-vue";
import DeptTree from "@/views/hospital/schedule/components/department-tree.vue";
import DoctorCard from "@/components/doctor/card.vue";
import {
  getScheduleDoctor,
  getDoctorByDept,
  addDoctorSchedules,
} from "@/api/hospital/index";

const deptId = ref(0);
const scheduleDoctors = ref();
const days = 7;

function getScheduleDoctorData() {
  getScheduleDoctor(days, deptId.value).then((response) => {
    scheduleDoctors.value = response.data;
  });
}
function querySchedule(value: number) {
  deptId.value = value;
  console.log("deptvalue", deptId);
  getScheduleDoctorData();

  getDoctorsByDept(value);
}

const dialog = reactive({
  visible: false,
  title: "添加排班信息",
});

function closeDialog() {
  dialog.visible = false;
}

function openDialog(date: string) {
  formData.date = date;
  console.log(date);

  dialog.visible = true;
}

const deptDoctorList = ref();
function getDoctorsByDept(id: number) {
  getDoctorByDept(id).then((response) => {
    deptDoctorList.value = response.data;
  });
}

function handleSubmit() {
  addDoctorSchedules(formData).then((response) => {
    ElMessage.success(response.data);
    dialog.visible = false;
    getScheduleDoctorData();
  });
}

const formData = reactive({
  doctorIds: [],
  number: undefined,
  date: "",
});

onMounted(() => {});
</script>
<style scoped>
.app-container {
  padding: 20px;
}
</style>
