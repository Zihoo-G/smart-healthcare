<template>
  <div id="app-container">
    <el-card shadow="never" class="table-container">
      <template #header>
        <el-button type="success" @click="openAddDialog()"
          ><i-ep-plus />新增</el-button
        >
      </template>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="科室" sortable> </el-table-column>
        <el-table-column prop="description" label="描述信息"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              type="success"
              size="small"
              @click="openDialog(scope.row.id)"
              v-if="!scope.row.parentId"
            >
              <i-ep-edit />添加
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="openDialog(scope.row.id)"
            >
              <i-ep-edit />编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row.id)"
              v-if="scope.row.parentId"
            >
              <i-ep-delete />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { getDepartmentTree } from "@/api/hospital/index";

let tableData = ref([]);

function getDepartmentTreeData() {
  getDepartmentTree().then((response) => {
    tableData.value = response.data;

    console.log(tableData);
  });
}
function openDialog(id: number) {}

function openAddDialog() {}
function handleDelete(id: number) {}

onMounted(() => {
  getDepartmentTreeData();
});
</script>
<style scoped></style>
