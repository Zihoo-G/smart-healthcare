<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="name" label="医生名称">
          <el-input
            v-model="queryParams.name"
            placeholder="医生名称"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item prop="uid" label="医生工号">
          <el-input
            v-model="queryParams.uid"
            placeholder="医生工号"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item prop="deptId" label="所在科室">
          <el-select
            style="width: 180px"
            v-model="queryParams.deptId"
            placeholder="请选择"
          >
            <el-option-group
              v-for="group in departmentData"
              :key="group.id"
              :label="group.name"
            >
              <el-option
                v-for="item in group.children"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-option-group>
          </el-select>
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
        <el-button type="success" @click="openDialog()"
          ><i-ep-plus />新增</el-button
        >
        <el-button
          type="danger"
          :disabled="ids.length === 0"
          @click="handleBatchDelete()"
          ><i-ep-delete />删除</el-button
        >
      </template>

      <el-table
        ref="dataTableRef"
        v-loading="loading"
        :data="doctorList"
        highlight-current-row
        :cell-style="cellStyle()"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="头像">
          <template #default="{ row }">
            <img style="width: 50px" :src="row.url" />
          </template>
        </el-table-column>
        <el-table-column label="医生工号" prop="uid" />
        <el-table-column label="医生名称" prop="name" />

        <el-table-column label="性别">
          <template #default="{ row }">
            {{ row.sex === 1 ? "男" : "女" }}
          </template>
        </el-table-column>

        <el-table-column label="医生级别" prop="type" />

        <el-table-column label="医生所在科室" prop="department.name" />

        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
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
            >
              <i-ep-delete />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="pageNum"
        v-model:limit="pageSize"
        @pagination="handleQuery"
      />
    </el-card>

    <!-- 新增或修改表单弹窗 -->
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
        <el-form-item label="医生工号" prop="uid">
          <el-input v-model="formData.uid" placeholder="请输入医生工号" />
        </el-form-item>

        <el-form-item label="医生姓名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入医生姓名" />
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-radio v-model="formData.sex" :label="1">男</el-radio>
          <el-radio v-model="formData.sex" :label="0">女</el-radio>
        </el-form-item>

        <el-form-item prop="type" label="医生级别">
          <el-select
            style="width: 180px"
            v-model="formData.type"
            placeholder="请选择"
          >
            <el-option label="主任医师" value="主任医师"></el-option>
            <el-option label="副主任医师" value="副主任医师"></el-option>
            <el-option label="主治医师" value="主治医师"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="deptId" label="所在科室">
          <el-select
            style="width: 180px"
            v-model="formData.deptId"
            placeholder="请选择"
          >
            <el-option-group
              v-for="group in departmentData"
              :key="group.id"
              :label="group.name"
            >
              <el-option
                v-for="item in group.children"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item label="医生头像" prop="url">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8082/sys/hospital/doctor/avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData.url" :src="formData.url" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 分配菜单弹窗  -->
    <el-dialog
      v-model="menuDialogVisible"
      :title="'【' + checkedRole.name + '】权限分配'"
      width="800px"
    >
      <el-scrollbar v-loading="loading" max-height="600px">
        <el-tree
          ref="menuRef"
          node-key="value"
          show-checkbox
          :data="menuList"
          :default-expand-all="true"
        >
          <template #default="{ data }">
            {{ data.label }}
          </template>
        </el-tree>
      </el-scrollbar>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleRoleMenuSubmit"
            >确 定</el-button
          >
          <el-button @click="menuDialogVisible = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getRoleMenuIds, updateRoleMenus } from "@/api/role";
import { getMenuOptions } from "@/api/menu";

import { RolePageVO } from "@/api/role/types";

import {
  getDoctorPage,
  getDepartmentTree,
  getDoctorById,
  addDoctor,
  removeDoctor,
  removeDoctors,
  updateDoctor,
} from "@/api/hospital/index";
import {
  DoctorPageResult,
  DoctorQuery,
  DoctorForm,
} from "@/api/hospital/types";

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
const pageNum = ref(1);
const pageSize = ref(10);

const queryParams = reactive<DoctorQuery>({});

const doctorList = ref<DoctorPageResult[]>();

const dialog = reactive({
  title: "",
  visible: false,
});

const formData = reactive<DoctorForm>({
  uid: undefined,
  deptId: undefined,
  name: "",
  sex: 1,
  url: "",
  type: "",
});

const rules = reactive({
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入角色编码", trigger: "blur" }],
  dataScope: [{ required: true, message: "请选择数据权限", trigger: "blur" }],
  status: [{ required: true, message: "请选择状态", trigger: "blur" }],
});

const menuDialogVisible = ref(false);

const menuList = ref<OptionType[]>([]);

interface CheckedRole {
  id?: number;
  name?: string;
}
let checkedRole: CheckedRole = reactive({});

/** 查询 */
function handleQuery() {
  loading.value = true;
  getDoctorPage(pageNum.value, pageSize.value, queryParams)
    .then((response) => {
      console.log(response);

      doctorList.value = response.data.records;
      total.value = response.data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}
/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  pageNum.value = 1;
  handleQuery();
}

/** 行checkbox 选中事件 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

/** 打开角色表单弹窗 */
function openDialog(doctorId?: number) {
  dialog.visible = true;
  if (doctorId) {
    dialog.title = "修改医生信息";
    getDoctorById(doctorId).then(({ data }) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增医生信息";
  }
}

/** 角色保存提交 */
function handleSubmit() {
  roleFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const manufactureId = formData.id;
      if (manufactureId) {
        updateDoctor(formData)
          .then(() => {
            ElMessage.success("修改成功");
            closeDialog();
            resetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        addDoctor(formData)
          .then(() => {
            ElMessage.success("新增成功");
            closeDialog();
            resetQuery();
          })
          .finally(() => (loading.value = false));
      }
    }
  });
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

  formData.uid = undefined;
  formData.name = "";
  formData.sex = 1;
  formData.deptId = 0;
}

/** 删除角色 */
function handleBatchDelete() {
  if (ids.value.length <= 0) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    removeDoctors(ids.value)
      .then(() => {
        loading.value = true;
        ElMessage.success("删除成功");
        resetQuery();
      })
      .finally(() => {
        loading.value = false;
      });
  });
}

function handleDelete(roleId: number) {
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    removeDoctor(roleId)
      .then(() => {
        ElMessage.success("删除成功");
        resetQuery();
      })
      .finally(() => {
        loading.value = false;
      });
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

const departmentData = ref([]);
/**
 * 查询出全部科室
 */
function getDepartmentTreeData() {
  getDepartmentTree().then((response) => {
    console.log(response);
    departmentData.value = response.data;
  });
}

/**
 * 定义表格内容居中
 */
function cellStyle() {
  return { "text-align": "center" };
}

/**
 * 上传头像
 */
function handleAvatarSuccess(res: any, file: any) {
  formData.url = res.data;
}
function beforeAvatarUpload(file: any) {
  console.log(file);

  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error("上传头像图片只能是 JPG 格式!");
  }
  if (!isLt2M) {
    ElMessage.error("上传头像图片大小不能超过 2MB!");
  }
  return isJPG && isLt2M;
}

onMounted(() => {
  handleQuery();
  getDepartmentTreeData();
});
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
