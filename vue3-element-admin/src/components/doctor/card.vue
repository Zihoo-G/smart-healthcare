<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <img :src="info.url" style="width: 100%; border-radius: 50%" />
      </el-col>
      <el-col :span="18">
        <div>
          <span class="name">{{ info.name }}</span>
          <span class="type">{{ info.type }}</span>
          <span class="number">{{ number }}号</span>
        </div>
        <div>
          <span class="description">{{ info.description }}</span>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script setup lang="ts" name="DoctorCard">
defineProps(["info", "number"]);
</script>
<style scoped>
.name {
  color: black;
  font-weight: bold;
  font-size: 25px;
}
.type {
  color: rgb(95, 95, 94);
  font-size: 15px;
  margin-left: 20px;
}
.number {
  color: black;
  font-weight: 100;
  font-size: 20px;
  margin-left: 20px;
}
</style>
