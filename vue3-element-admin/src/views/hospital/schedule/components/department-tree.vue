<template>
  <el-card shadow="never" class="card">
    <el-input v-model="deptName" placeholder="部门名称" clearable>
      <template #prefix>
        <i-ep-search />
      </template>
    </el-input>

    <el-tree
      ref="deptTreeRef"
      class="mt-2"
      :data="deptList"
      :props="{ children: 'children', label: 'name', disabled: '' }"
      :expand-on-click-node="false"
      :filter-node-method="handleFilter"
      default-expand-all
      @node-click="handleNodeClick"
    />
  </el-card>
</template>
<script setup name="DeptTree">
import { getDepartmentTree } from "@/api/hospital/index";
// 声明事件
const emits = defineEmits(["node-click"]);
const deptList = ref([]);

// const emits = defineEmits(["node-click"]);

function getDepartmentTreeData() {
  getDepartmentTree().then((response) => {
    console.log(response);
    deptList.value = response.data;
  });
}

function handleNodeClick(data) {
  console.log(data.id);
  emits("node-click", data.id);
}
onMounted(() => {
  getDepartmentTreeData();
});
</script>
