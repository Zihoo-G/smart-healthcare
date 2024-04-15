<!-- 雷达图 -->
<template>
  <el-card>
    <template #header> 诊断领域雷达图 </template>
    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

const props = defineProps({
  id: {
    type: String,
    default: "radarChart",
  },
  className: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "200px",
    required: true,
  },
  height: {
    type: String,
    default: "200px",
    required: true,
  },
});

const options = {
  grid: {
    left: "2%",
    right: "2%",
    bottom: "10%",
    containLabel: true,
  },
  legend: {
    x: "center",
    y: "bottom",
    data: ["自评", "系统统计", "患者评价"],
    textStyle: {
      color: "#999",
    },
  },
  radar: {
    // shape: 'circle',
    radius: "60%",
    indicator: [
      { name: "诊断能力" },
      { name: "治疗能力" },
      { name: "外科技能" },
      { name: "沟通能力" },
      { name: "研究能力" },
      { name: "管理能力" },
    ],
  },
  series: [
    {
      name: "Budget vs spending",
      type: "radar",
      itemStyle: {
        borderRadius: 6,
        color: function (params: any) {
          //自定义颜色
          const colorList = ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C"];
          return colorList[params.dataIndex];
        },
      },
      data: [
        {
          value: [400, 400, 400, 400, 400, 400],
          name: "预定数量",
        },
        {
          value: [300, 300, 300, 300, 300, 300],
          name: "下单数量",
        },
        {
          value: [200, 200, 200, 200, 200, 200],
          name: "发货数量",
        },
      ],
    },
  ],
};

const chart = ref<any>("");

onMounted(() => {
  chart.value = markRaw(
    echarts.init(document.getElementById(props.id) as HTMLDivElement)
  );

  chart.value.setOption(options);

  window.addEventListener("resize", () => {
    chart.value.resize();
  });
});

onActivated(() => {
  if (chart.value) {
    chart.value.resize();
  }
});
</script>
