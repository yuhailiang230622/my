<template>
  <div>
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="isAdd">添加</el-button>

    <v-table @edit="edit"></v-table>

    <v-dialog :addInfo="addInfo" ref="dialog" @cancel="cancel"></v-dialog>
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
      //  console.log(e,'12312132132123');
      this.addInfo.isAdd = false;
      this.addInfo.isShow = true;
      this.$refs.dialog.look(e);
    },
  },
};
</script>

<style lang="" scoped>
</style>
