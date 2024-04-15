<template>
  <div class="app-container">
    <el-form ref="queryFormRef" :model="queryParams" :inline="true">
      <el-form-item props="name" label="患者姓名">
        <el-input
          v-model="queryParams.name"
          placeholder="患者姓名"
          clearable
          @keyup.enter="handleQuery"
        ></el-input>
      </el-form-item>

      <el-form-item props="date" label="预约日期">
        <el-date-picker
          v-model="queryParams.date"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-form-item>
      <el-button type="primary" @click="handleQuery"
        ><i-ep-search />搜索</el-button
      >
      <el-button @click="resetQuery"><i-ep-refresh />重置</el-button>
      <el-form-item> </el-form-item>
    </el-form>

    <el-table
      ref="dataTableRef"
      v-loading="loading"
      :data="patientsList"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="患者名称" prop="name" />
      <el-table-column label="预约日期" prop="date" />
      <el-table-column label="是否就诊" prop="number">
        <template #default="{ row }">
          <el-tag type="danger">未就诊</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="检查项1" prop="descriptions[0]" />
      <el-table-column label="检查项2" prop="descriptions[1]" />
      <el-table-column label="检查项3" prop="descriptions[2]" />
      <el-table-column label="检查项4" prop="descriptions[3]" />

      <el-table-column fixed="right" label="操作" width="280">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            link
            @click="openCheckDialog(scope.row.uid)"
          >
            <i-ep-edit />添加检查
          </el-button>
          <el-button
            type="primary"
            size="small"
            link
            @click="openDialog(scope.row.uid)"
          >
            <i-ep-delete />开具处方
          </el-button>

          <el-button
            type="primary"
            size="small"
            link
            @click="openCheckInfoDialog(scope.row.uid)"
          >
            <i-ep-delete />详细检查信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="1000px"
      @close="closeDialog"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <el-form ref="queryFormRef" :model="submit" :inline="true">
              <div v-for="(item, index) in submit" :key="index">
                <el-form-item props="name" label="药物名称">
                  <el-select
                    v-model="item.name"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="药物名称"
                    :remote-method="remoteDrugHandler"
                    :loading="loading"
                    style="width: 240px"
                  >
                    <el-option
                      v-for="(drug, index) in drugOptions"
                      :key="index"
                      :label="drug.name"
                      :value="drug.id"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item props="number" label="药物剂量">
                  <el-input
                    v-model="item.number"
                    clearable
                    placeholder="药物剂量"
                  />
                </el-form-item>
              </div>

              <el-form-item>
                <el-button type="primary" @click="handleQuery"
                  >添加</el-button
                ></el-form-item
              >
              <el-form-item>
                <el-button type="primary" @click="handleSubmitDrug"
                  >提交</el-button
                >
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <h2>AI建议</h2>
            <div v-for="(check, index) in checkList" :key="index">
              <el-text tag="b">{{ check.name }}</el-text>
              <ul>
                <li>
                  推荐药物：
                  <span v-for="(drug, idx) in check.commonDrug" :key="idx"
                    >{{ drug }}&nbsp;
                  </span>
                </li>
                <li>
                  治疗周期：
                  <span>{{ check.cureLasttime }}</span>
                </li>
              </ul>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 添加检查对话框 -->
    <el-dialog
      v-model="checkDialog.visible"
      :title="checkDialog.title"
      width="1000px"
      @close="closeCheckDialog"
    >
      <el-form v-model="form">
        <el-form-item
          v-for="(select, index) in selects"
          :key="index"
          :label="select.name"
        >
          <el-select
            v-model="form.descriptionArray[index]"
            filterable
            remote
            reserve-keyword
            placeholder="请输入检查疾病状况"
            :remote-method="remoteMethod"
            :loading="loading"
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>

          <el-button type="primary" @click="addSelection(index + 1)"
            >添加</el-button
          >
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitCheck">提交</el-button>
          <el-button @click="closeCheckDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 检查详细信息对话框 -->
    <el-dialog
      v-model="checkInfoDialog.visible"
      :title="checkInfoDialog.title"
      width="1000px"
      @close="closeCheckInfoDialog"
    >
      <div v-for="(check, index) in checkList" :key="index">
        <el-text tag="b">{{ check.name }}</el-text
        ><br />
        <el-text>{{ check.desc }}</el-text>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="Check">
import { useUserStore } from "@/store";
import { getPatientsInfo, addCheck, getCheckList } from "@/api/hospital/index";
import { title } from "process";
import { CheckInfo } from "@/api/hospital/types";
import { getSymptomInfo, getSymptomDetail } from "@/api/check/index";
import { type CheckList, type SubmitDrugInfo } from "@/api/check/types";
import {
  getDrugPage,
  batchAddRecipe,
  getDrugInfoByName,
} from "@/api/drug/index";
import { type DrugOption } from "@/api/drug/types";
const userStore = useUserStore();
const loading = ref(false);
const uid = ref(0);

/**
 * 选择框列表
 */
const selects = ref([{ name: "检查信息1" }]);
const form = reactive<CheckInfo>({
  uid: 0,
  descriptionArray: [""],
  description: "",
});
const dialog = reactive({
  visible: false,
  title: "开具处方",
});

const checkDialog = reactive({
  visible: false,
  title: "检查添加",
});
const queryParams = reactive({
  id: userStore.user.id,
  name: "",
  date: "",
});
const patientsList = ref([]);

const submit = reactive<SubmitDrugInfo[]>([]);

function handleQuery() {
  if (queryParams.date != "") {
    let date = new Date(queryParams.date);
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 >= 10
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1);
    let day = date.getDate();
    queryParams.date = year + "-" + month + "-" + day;
  }

  getPatientsInfo(queryParams).then((response) => {
    patientsList.value = response.data;
    console.log("patientList", patientsList.value);
  });
}

/**
 * 重置表单信息
 */
function resetQuery() {}

function handleSelectionChange() {}

/**
 * 打开对话栏
 */
function openDialog(id: number) {
  dialog.visible = true;
  getCheckListFunction(id);
  uid.value = id;
  submit.length = 0;
}

/**
 * 关闭对话栏
 */
function closeDialog() {
  dialog.visible = false;
}

function openCheckDialog(id: number) {
  checkDialog.visible = true;
  form.uid = id;
}

function closeCheckDialog() {
  checkDialog.visible = false;
}
/**
 * 添加药物数据
 */
function handleSubmitDrug() {
  for (let i = 0; i < submit.length; i++) {
    submit[i].uid = uid.value;
  }

  batchAddRecipe(submit).then((response) => {
    console.log(response);
    if (response.data) {
      ElMessage.success("成功添加了处方信息");
      dialog.visible = false;
    } else {
      ElMessage.error("未成功添加");
    }
  });
}

const options = ref([]);
const size = ref(5);
/**
 * 远程查找方法
 */
const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    getSymptomInfo(query, size.value).then((response) => {
      console.log(response.data);

      options.value = response.data;
      console.log(options.value);

      loading.value = false;
    });
  }
};
/**
 * 提交检查信息
 */
function submitCheck() {
  loading.value = true;
  for (let i = 0; i < form.descriptionArray.length; i++) {
    if (i == form.descriptionArray.length - 1) {
      form.description += form.descriptionArray[i];
    } else {
      form.description += form.descriptionArray[i] + ",";
    }
  }

  addCheck(form)
    .then((response) => {
      ElMessage.success("添加成功");
      loading.value = false;
      checkDialog.visible = false;
    })
    .finally(() => {
      form.uid = 0;
      form.descriptionArray = [];
      form.description = "";
    });
}

const checkInfoDialog = reactive({
  visible: false,
  title: "检查详细信息",
});

const checkList = reactive<CheckList[]>([]);

function getCheckListFunction(id: number) {
  checkList.length = 0;
  getCheckList(id)
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        let info = {
          name: response.data[i].description,
          desc: "",
          commonDrug: [],
          cureLasttime: "",
        };
        checkList.push(info);
      }
    })
    .finally(() => {
      for (let i = 0; i < checkList.length; i++) {
        getSymptomDetail(checkList[i].name).then((detailResponse) => {
          console.log(detailResponse);

          checkList[i].desc = detailResponse.data.desc;
          checkList[i].commonDrug = detailResponse.data.commonDrug;
          checkList[i].cureLasttime = detailResponse.data.cureLasttime;

          // 根据药物名字找到所属的id
          console.log(detailResponse.data.commonDrug[0]);

          getDrugInfoByName(detailResponse.data.commonDrug[0]).then(
            (response) => {
              console.log(response.data);
              submit.push({
                did: response.data[0].id,
                number: 10,
                name: response.data[0].name,
              });
            }
          );
        });
      }
      loading.value = false;
    });
}
function openCheckInfoDialog(id: number) {
  checkInfoDialog.visible = true;
  loading.value = true;
  // checkList = [];
  getCheckListFunction(id);
}

function closeCheckInfoDialog() {
  checkInfoDialog.visible = false;
}

function addSelection(index: number) {
  selects.value.push({ name: "检查症状" + (index + 1) });
  form.descriptionArray.push("");
  console.log(form.descriptionArray);
}
const drugOptions = reactive<DrugOption[]>([]);
function remoteDrugHandler(query: string) {
  drugOptions.length = 0;
  getDrugPage(0, 5, { name: query }).then((response) => {
    const data = response.data;
    for (let i = 0; i < data.total; i++) {
      drugOptions.push({ id: data.records[i].id, name: data.records[i].name });
    }
  });
}
onMounted(() => {
  handleQuery();
  console.log(form.descriptionArray);
});
</script>
<style scoped></style>
