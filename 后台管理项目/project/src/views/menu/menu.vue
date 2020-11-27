<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="isAdd">添加</el-button>

    <v-table @edit="edit"></v-table>

    <v-dialog ref="diaLog" @cancel="cancel" :addInfo="addInfo"></v-dialog>
  </div>
</template>

<script>
import elBread from "../../components/el-bread";
import vTable from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        // 添加还是编辑
        isAdd: true,
      },
    };
  },
  components: {
    elBread,
    vTable,
    vDialog,
  },
  methods: {
    isAdd() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    cancel(e) {
      this.addInfo.isShow = e;
    },

    edit(e) {
      // e 是表格传过来的id值
      console.log(e, "sdasdasdasdas");
      // 事件点击我知道是编辑 更改弹窗的状态
      this.addInfo.isShow = true;
      // 告诉弹窗你是编辑
      this.addInfo.isAdd = false;
      // console.log(this.$refs.diaLog);
      this.$refs.diaLog.look(e);
    },
  },
};
</script>

<style lang="" scoped>
</style>
