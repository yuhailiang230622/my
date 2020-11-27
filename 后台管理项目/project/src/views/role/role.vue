<template>
  <div>
    <!-- 面包屑导航 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" plain size="small" @click="add"
      >添加</el-button
    >
    <!-- 列表渲染 -->
    <v-table @edit="edit"></v-table>
    <!-- 弹出窗 -->
    <v-diaLog ref="dialog" :addInfo="addInfo" @cancel="cancel"></v-diaLog>
  </div>
</template>

<script>
import elBread from "../../components/el-bread";
import vTable from "./list";
import vDiaLog from "./add";
export default {
  data() {
    return {
      addInfo: {
        isShow: false, //弹窗打开关闭
        isAdd: true, //添加还是编辑
      },
    };
  },
  components: {
    elBread,
    vTable,
    vDiaLog,
  },

  methods: {
    add() {
      // 点击添加打开弹出窗
      this.addInfo.isShow = true;
    },
    cancel() {
      // 子组件触发的父组件修改弹窗状态
      this.addInfo.isShow = false;
    },
    edit(e) {
      // 子组件触发父组件联动编辑
      this.addInfo.isShow = true;
      this.addInfo.isAdd = false;
      this.$refs.dialog.look(e);
    },
  },
};
</script>

<style lang="" scoped>
.el-button {
  margin-bottom: 20px;
}
</style>
