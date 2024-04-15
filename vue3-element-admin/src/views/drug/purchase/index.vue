<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="name" label="患者姓名">
          <el-input
            v-model="queryParams.name"
            placeholder="角色名称"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item prop="date" label="日期">
          <el-date-picker
            v-model="queryParams.date"
            type="date"
            placeholder="Pick a day"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
            :size="size"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQuery"
            ><i-ep-search />搜索</el-button
          >
          <el-button @click="resetQuery"><i-ep-refresh />重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never" class="table-container">
      <template #header>
        <el-button
          type="success"
          @click="handleSubmit()"
          :disabled="ids.length === 0"
          ><i-ep-position />全部下单</el-button
        >
        <el-button
          type="danger"
          :disabled="ids.length === 0"
          @click="handleDelete()"
          ><i-ep-delete />删除</el-button
        >
      </template>

      <el-table
        ref="dataTableRef"
        v-loading="loading"
        :data="recipeList"
        highlight-current-row
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="患者名称" prop="uname" min-width="100" />
        <el-table-column label="药物名称" prop="dname" />
        <el-table-column label="数量" align="center" prop="number" />
        <el-table-column label="总价" align="center" prop="price" />

        <el-table-column label="是否出库" align="center" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.isOutBound === 0" type="primary"
              >未出库</el-tag
            >
            <el-tag v-else type="success">已出库</el-tag>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              @click="handleSubmit(scope.row.id)"
              :disabled="scope.row.isOutBound === 1"
            >
              <i-ep-position />下单
            </el-button>
            <el-button
              type="primary"
              size="small"
              link
              @click="openDialog(scope.row.id)"
              :disabled="scope.row.isOutBound === 1"
            >
              <i-ep-edit />编辑
            </el-button>
            <el-button
              type="primary"
              size="small"
              link
              @click="handleDelete(scope.row.id)"
              :disabled="scope.row.isOutBound === 1"
            >
              <i-ep-delete />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getRecipeInfo, outBoundRecipe } from "@/api/drug/index";
import { getMenuOptions } from "@/api/menu";

import { RolePageVO, RoleForm, RoleQuery } from "@/api/role/types";

defineOptions({
  name: "Role",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const roleFormRef = ref(ElForm);
const menuRef = ref(ElTree);

const loading = ref(false);
const ids = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive({
  name: "",
  date: "",
  pageNum: 1,
  pageSize: 10,
});
// 日期选择框设置
const size = ref<"default" | "large" | "small">("default");
const shortcuts = [
  {
    text: "Today",
    value: new Date(),
  },
  {
    text: "Yesterday",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: "A week ago",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};

const dialog = reactive({
  title: "",
  visible: false,
});

const recipeList = ref([]);
/** 查询 */
function handleQuery() {
  loading.value = true;
  getRecipeInfo(
    queryParams.name,
    queryParams.date,
    queryParams.pageNum,
    queryParams.pageSize
  )
    .then((response) => {
      recipeList.value = response.data;
      console.log(response.data);
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行checkbox 选中事件 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

/** 关闭表单弹窗 */
function closeDialog() {
  dialog.visible = false;
  resetForm();
}

/** 重置表单 */
function resetForm() {
  roleFormRef.value.resetFields();
  roleFormRef.value.clearValidate();

  formData.id = undefined;
  formData.sort = 1;
  formData.status = 1;
}

/**
 * 提交药品下单信息
 */
function handleSubmit(recipeId?: number) {
  const recipeIds = [recipeId || ids.value];
  if (!recipeIds) {
    ElMessage.warning("请选择处方");
    return;
  }
  console.log(recipeIds);

  ElMessageBox.confirm("确认下单已选中的数据项？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    loading.value = true;
    outBoundRecipe(recipeIds)
      .then(() => {
        ElMessage.success("出库成功");
        handleQuery();
      })
      .finally(() => (loading.value = false));
  });
}

/** 删除角色 */
function handleDelete(roleId?: number) {
  const roleIds = [roleId || ids.value].join(",");
  if (!roleIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    loading.value = true;
    deleteRoles(roleIds)
      .then(() => {
        ElMessage.success("删除成功");
        resetQuery();
      })
      .finally(() => (loading.value = false));
  });
}

/** 打开分配菜单弹窗 */
function openMenuDialog(row: RolePageVO) {
  const roleId = row.id;
  if (roleId) {
    checkedRole = {
      id: roleId,
      name: row.name,
    };
    menuDialogVisible.value = true;
    loading.value = true;

    // 获取所有的菜单
    getMenuOptions().then((response) => {
      menuList.value = response.data;
      // 回显角色已拥有的菜单
      getRoleMenuIds(roleId)
        .then(({ data }) => {
          const checkedMenuIds = data;
          checkedMenuIds.forEach((menuId) =>
            menuRef.value.setChecked(menuId, true, false)
          );
        })
        .finally(() => {
          loading.value = false;
        });
    });
  }
}

/** 角色分配菜单保存提交 */
function handleRoleMenuSubmit() {
  const roleId = checkedRole.id;
  if (roleId) {
    const checkedMenuIds: number[] = menuRef.value
      .getCheckedNodes(false, true)
      .map((node: any) => node.value);

    loading.value = true;
    updateRoleMenus(roleId, checkedMenuIds)
      .then(() => {
        ElMessage.success("分配权限成功");
        menuDialogVisible.value = false;
        resetQuery();
      })
      .finally(() => {
        loading.value = false;
      });
  }
}

onMounted(() => {
  handleQuery();
});
</script>
