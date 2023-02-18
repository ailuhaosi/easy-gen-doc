<template>
  <div v-if="isDetailComp" style="margin-bottom: 10px">
    <span>组件名称：</span>
    <el-select
      style="width: 300px"
      v-model="curPickedDetailComp"
      @change="onChangeDetailComp"
    >
      <el-option
        v-for="item in detailCompOpts"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      >
      </el-option>
    </el-select>
  </div>
  <el-table
    :data="tableData"
    height="400"
    style="width: 100%"
    border
    class="atomic-meta-container"
    header-row-class-name="atomic-meta-header"
    row-key="metaKey"
    @filter-change="onFilterChange"
  >
    <el-table-column prop="metaKey" label="元数据属性" width="200" />
    <el-table-column prop="metaFieldType" label="属性类型" width="100" />
    <el-table-column prop="metaDescrip" label="描述" />
    <el-table-column prop="metaExample" label="示例" />
    <el-table-column
      prop="useInRange"
      label="使用范围"
      column-key="useInRange"
      width="120"
      :filters="[
        { text: '全部', value: 'All' },
        { text: '表单(Object)', value: 'Form' },
        { text: '表格(Array<Object>)', value: 'Table' },
      ]"
      :filter-method="filterUseInRange"
    >
      <template #default="scope">
        <el-tag type="success">{{ scope.row.useInRange }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import {
  computed,
  shallowReactive,
  ShallowReactive,
  shallowRef,
  ShallowRef,
  triggerRef,
  nextTick,
  ref,
} from "vue";
import { deepClone } from "./utils";
/* type:"···",//组件类型;Pascal命名;自定义组件为 Customize
      //key,
      //label,
      //searchKey,//对应元数据中的searchPropKey
      labelWidth,//表单专用;label宽度
      isShow,//由后端根据权限聚合
      componentAttr,//具体组件的其它属性 */
const props = defineProps({
  type: {
    type: String,
    default: "RuntimeMeta",
    validator: function (val: string) {
      return [
        "DesigntimeMeta",
        "RuntimeMeta",
        "DetailCompMeta",
        ////////////////
        "ComposeCompMeta",
      ].includes(val);
    },
  },
  isDetailComp: {
    type: Boolean,
    default: false,
  },
});
const detailCompOpts = [
  {
    label: "组合组件 - GroupComp",
    value: "ComposeCompMeta",
  },
  {
    label: "Select组件 - Select",
    value: "SelectCompMeta",
  },
];
const curPickedDetailComp = ref("ComposeCompMeta");
const emits = defineEmits(["update:type"]);
const onChangeDetailComp = (val: string) => {
  emits("update:type", val);
};
interface MetaData {
  useInRange: string;
  metaKey: string;
  metaFieldType: string;
  metaDescrip: string;
  metaExample: string;
  children?: Array<MetaData>;
}
interface AllData {
  [key: string]: Array<MetaData>;
}
const allData: AllData = {
  DesigntimeMeta: [
    {
      useInRange: "All",
      metaKey: "staticConfig",
      metaFieldType: `object`,
      metaDescrip: "静态属性",
      metaExample: "",
      children: [
        {
          useInRange: "All",
          metaKey: "type",
          metaFieldType: "string",
          metaDescrip: "组件类型;必须Pascal命名;自定义组件为`Customize`",
          metaExample: "Input、Select、Customize",
        },
        {
          useInRange: "All",
          metaKey: "key",
          metaFieldType: "string",
          metaDescrip:
            "组件元数据唯一标志;默认同表字段名propCode;一般不在数据库中真实存储",
          metaExample: "",
        },
        {
          useInRange: "All",
          metaKey: "label",
          metaFieldType: "string",
          metaDescrip: "表格的表头、表单的label;默认同表字段的displayName",
          metaExample: "",
        },
        {
          useInRange: "All",
          metaKey: "searchKey",
          metaFieldType: "string",
          metaDescrip:
            "对应元数据中的searchPropKey;使用`···.···`或`···.$.···`分隔;用于子表的字段命名规范",
          metaExample: "一对多:`···.$.···`、多对一:`···.···`",
        },
        {
          useInRange: "Form",
          metaKey: "labelWidth",
          metaFieldType: "string",
          metaDescrip: "label宽度,表单专用",
          metaExample: "120px",
        },
        {
          useInRange: "All",
          metaKey: "isShow",
          metaFieldType: "boolean",
          metaDescrip:
            "是否 显示字段 或 表格的列,由后端根据权限聚合;一般不在数据库中真实存储",
          metaExample: "",
        },
        {
          useInRange: "All",
          metaKey: "componentAttr",
          metaFieldType: "object",
          metaDescrip: "具体组件的其它属性",
          metaExample: "{···}",
          children: [],
        },
        {
          useInRange: "All",
          metaKey: "groupInfo",
          metaFieldType: "object",
          metaDescrip: "组合组件的组信息;详见`组件元数据详述-组合组件`",
          metaExample: "{···}",
          children: [],
        },
      ],
    },
    {
      useInRange: "All",
      metaKey: "dynmicConfig",
      metaFieldType: "object",
      metaDescrip: "动态属性",
      metaExample: "",
      children: [],
    },
  ],
  RuntimeMeta: [
    {
      useInRange: "All",
      metaKey: "type",
      metaFieldType: "string",
      metaDescrip: "组件类型;必须Pascal命名;自定义组件为`Customize`",
      metaExample: "Input、Select、Customize",
    },
    {
      useInRange: "All",
      metaKey: "key",
      metaFieldType: "string",
      metaDescrip:
        "组件元数据唯一标志;默认同表字段名propCode;一般不在数据库中真实存储",
      metaExample: "",
    },
    {
      useInRange: "All",
      metaKey: "label",
      metaFieldType: "string",
      metaDescrip: "表格的表头、表单的label;默认同表字段的displayName",
      metaExample: "",
    },
    {
      useInRange: "All",
      metaKey: "searchKey",
      metaFieldType: "string",
      metaDescrip:
        "对应元数据中的searchPropKey;使用`···.···`或`···.$.···`分隔;用于子表的字段命名规范",
      metaExample: "一对多:`···.$.···`、多对一:`···.···`",
    },
    {
      useInRange: "Form",
      metaKey: "labelWidth",
      metaFieldType: "string",
      metaDescrip: "label宽度,表单专用",
      metaExample: "120px",
    },
    {
      useInRange: "All",
      metaKey: "isShow",
      metaFieldType: "boolean",
      metaDescrip:
        "是否 显示字段 或 表格的列,由后端根据权限聚合;一般不在数据库中真实存储",
      metaExample: "",
    },
    {
      useInRange: "All",
      metaKey: "componentAttr",
      metaFieldType: "object",
      metaDescrip: "具体组件的其它属性",
      metaExample: "{···}",
    },
    {
      useInRange: "All",
      metaKey: "groupInfo",
      metaFieldType: "object",
      metaDescrip: "组合组件的组信息;详见`组件元数据详述-组合组件`",
      metaExample: "{···}",
      children: [],
    },
  ],
  ComposeCompMeta: [
    {
      useInRange: "All",
      metaKey: "staticConfig",
      metaFieldType: `object`,
      metaDescrip: "静态属性",
      metaExample: "",
      children: [
        {
          useInRange: "All",
          metaKey: "type",
          metaFieldType: "string | 'GroupComp'",
          metaDescrip: "组件类型;组合组件、带范围查询的DateTimePicker组件",
          metaExample: "",
        },
        {
          useInRange: "All",
          metaKey: "groupInfo",
          metaFieldType: "object",
          metaDescrip: "组合组件的组信息;",
          metaExample: "{···};如带范围查询的DateTimePicker组件",
          children: [
            {
              useInRange: "All",
              metaKey: "key",
              metaFieldType: "string",
              metaDescrip: "组的唯一标志;默认为所有组成员的字段拼接&",
              metaExample: "startTime&endTime",
            },
            {
              useInRange: "All",
              metaKey: "isPartial",
              metaFieldType: "boolean",
              metaDescrip: "是否为组成员;",
              metaExample: "",
            },
            {
              useInRange: "All",
              metaKey: "valTransFunc",
              metaFieldType: "string | Function | undefined",
              metaDescrip:
                "值转化函数;描述了 成员组件的值与组合体元字段的值的对应关系;默认没有配这个字段时使用字段order转化成数组形式为值",
              metaExample: '`"return [configObj.key1,configObj.key2]"`',
            },
            {
              useInRange: "All",
              metaKey: "compType",
              metaFieldType: "string | null | undefined",
              metaDescrip:
                "成员组件内建组件类型;仅当非成员时,即组合体元字段时生效",
              metaExample:
                '`一共三种："$Input" 表示多个Input组合、"Input&Select&Input"、"Customize"`;前两种 的真实元数据取自原字段的元数据,第三种自定义时仅利用自身元数据',
            },
          ],
        },
      ],
    },
  ],
  SelectCompMeta: [
    {
      useInRange: "All",
      metaKey: "staticConfig",
      metaFieldType: `object`,
      metaDescrip: "静态属性",
      metaExample: "",
      children: [
        {
          useInRange: "All",
          metaKey: "options",
          metaFieldType: `object`,
          metaDescrip: "选项",
          metaExample: "",
        },
      ],
    },
  ],
};

const filteredAllData: ShallowRef<AllData> = shallowRef(deepClone(allData));

const tableData = computed(() => {
  return filteredAllData.value[props.type];
});
const filterUseInRange = (value: string, row: MetaData) => {
  if (props.type === "RuntimeMeta") {
    filteredAllData.value[props.type] = deepClone(allData[props.type]);
    if (value === "All") {
      return true;
    } else {
      return ["All", value].includes(row.useInRange);
    }
  } else {
    return true;
  }
};
const onFilterChange = (filters: any) => {
  if (
    filters["useInRange"].length === 0 ||
    filters["useInRange"].includes("All")
  ) {
    filteredAllData.value[props.type] = deepClone(allData[props.type]);
  } else {
    if (props.type === "RuntimeMeta") {
    } else {
      filteredAllData.value[props.type] = deepClone(allData[props.type]);

      filteredAllData.value[props.type][0].children = (
        filteredAllData.value[props.type][0].children as Array<MetaData>
      ).filter((el) =>
        ["All", ...filters["useInRange"]].includes(el.useInRange)
      );

      const componentAttrIdx: number = (
        filteredAllData.value[props.type][0].children as MetaData[]
      ).findIndex((el) => el.metaKey === "componentAttr");
      const allStaticMeta = filteredAllData.value[props.type][0]
        .children as MetaData[];
      const componentAttrChildrenMetas = allStaticMeta[componentAttrIdx]
        .children as MetaData[];
      allStaticMeta[componentAttrIdx].children =
        componentAttrChildrenMetas.filter((el) =>
          ["All", ...filters["useInRange"]].includes(el.useInRange)
        );
    }
  }
  nextTick(() => {
    triggerRef(filteredAllData);
  });
};
</script>
<style lang="scss" scoped>
.atomic-meta-container :deep(.el-table__body),
.atomic-meta-container :deep(.el-table__header) {
  //padding: 0;
  margin: 0;
}
.atomic-meta-container :deep(table.el-table__header thead > tr > th) {
  background: #eee;
  padding: 20px 0 20px 0;
  border: 1px solid #dfe2e5;
}
</style>
