<!-- 任务管理页面组件
     展示任务列表数据表格，支持分页、过滤、排序和响应式列隐藏
     集成DevExtreme DataGrid组件，提供完整的数据管理功能 -->
<template>
  <div>
    <!-- 页面标题 -->
    <h2 class="content-block">Tasks</h2>

    <!-- DevExtreme数据表格组件 -->
    <dx-data-grid
      class="dx-card wide-card"
      :data-source="dataSourceConfig"
      :focused-row-index="0"
      :show-borders="false"
      :focused-row-enabled="true"
      :column-auto-width="true"
      :column-hiding-enabled="true"
    >
      <!-- 分页配置：每页显示10条记录 -->
      <dx-paging :page-size="10" />
      
      <!-- 分页器配置：显示页面大小选择器和信息 -->
      <dx-pager :show-page-size-selector="true" :show-info="true" />
      
      <!-- 过滤行：允许用户在列头输入过滤条件 -->
      <dx-filter-row :visible="true" />

      <!-- 任务ID列：固定宽度90px，隐藏优先级为2 -->
      <dx-column data-field="Task_ID" :width="90" :hiding-priority="2" />

      <!-- 任务主题列：主要信息列，较高显示优先级 -->
      <dx-column
        data-field="Task_Subject"
        caption="Subject"
        :width="190"
        :hiding-priority="8"
      />

      <!-- 任务状态列：显示任务当前状态 -->
      <dx-column
        data-field="Task_Status"
        caption="Status"
        :hiding-priority="6"
      />

      <!-- 任务优先级列：使用查找组件显示友好的优先级名称 -->
      <dx-column
        data-field="Task_Priority"
        caption="Priority"
        :hiding-priority="5"
      >
        <!-- 查找组件：将优先级数值转换为可读文本 -->
        <dx-lookup
          display-expr="name"
          value-expr="value"
          :data-source="priorities"
        />
      </dx-column>

      <!-- 负责人列：显示任务分配的员工姓名，关联表数据 -->
      <dx-column
        data-field="ResponsibleEmployee.Employee_Full_Name"
        caption="Assigned To"
        :allow-sorting="false"
        :hiding-priority="7"
      />

      <!-- 任务开始日期列：日期类型，自动格式化 -->
      <dx-column
        data-field="Task_Start_Date"
        caption="Start Date"
        data-type="date"
        :hiding-priority="3"
      />

      <!-- 任务截止日期列：日期类型，自动格式化 -->
      <dx-column
        data-field="Task_Due_Date"
        caption="Due Date"
        data-type="date"
        :hiding-priority="4"
      />

      <!-- 任务优先级列（重复定义，用于不同显示用途） -->
      <dx-column
        data-field="Task_Priority"
        caption="Priority"
        name="Priority"
        :hiding-priority="1"
      />

      <!-- 任务完成度列：显示任务完成百分比 -->
      <dx-column
        data-field="Task_Completion"
        caption="Completion"
        :hiding-priority="0"
      />
    </dx-data-grid>
  </div>
</template>

<!-- Vue 3 Script Setup语法 -->
<script setup>
// === 导入依赖 ===
// DevExtreme OData存储支持
import "devextreme/data/odata/store";
// DevExtreme数据表格组件及其子组件
import DxDataGrid, {
  DxColumn,      // 列定义组件
  DxFilterRow,   // 过滤行组件
  DxLookup,      // 查找组件
  DxPager,       // 分页器组件
  DxPaging       // 分页配置组件
} from "devextreme-vue/data-grid";

// === 静态数据配置 ===
// 优先级数据映射表：将数值转换为可读的优先级名称
const priorities = [
  { name: "High", value: 4 },      // 高优先级
  { name: "Urgent", value: 3 },    // 紧急优先级
  { name: "Normal", value: 2 },    // 普通优先级
  { name: "Low", value: 1 }        // 低优先级
];

// === 数据源配置 ===
// DevExtreme数据源配置，连接到DevExpress演示OData服务
const dataSourceConfig = {
  // OData存储配置
  store: {
    type: "odata",                                                      // 数据源类型：OData服务
    key: "Task_ID",                                                     // 主键字段
    url: "https://js.devexpress.com/Demos/DevAV/odata/Tasks"          // OData服务URL
  },
  
  // 关联表展开：包含负责员工信息
  expand: "ResponsibleEmployee",
  
  // 查询字段选择：指定需要获取的字段，提高查询性能
  select: [
    "Task_ID",                              // 任务ID
    "Task_Subject",                         // 任务主题
    "Task_Start_Date",                      // 开始日期
    "Task_Due_Date",                        // 截止日期
    "Task_Status",                          // 任务状态
    "Task_Priority",                        // 任务优先级
    "Task_Completion",                      // 完成进度
    "ResponsibleEmployee/Employee_Full_Name" // 负责员工姓名（关联字段）
  ]
};
</script>
