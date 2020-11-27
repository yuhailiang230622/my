<template>
  <div>
    <el-table
      :data="userList"
      style="width: 100%"
    >
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>

      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>

      <el-table-column prop="roleid" label="所属角色"> </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="info" size="small" @click="edit(item.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.uid)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页视图  -->
    <el-pagination
      :page-size="userSize"
      background
      layout="prev, pager, next"
      :total="userCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getUserDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userList: "user/getUserList",
      userCount:'user/getUserCount',
      userSize:'user/getUserSize'
    })
  },
  mounted() {
    // this.getMenuList();
    this.getUserAction();
    this.getUserCount();
  },
  methods: {
    //获取行动
    ...mapActions({
      getUserAction: "user/getUserAction",
      getUserCount:'user/getCountAction',
      changePage:'user/changePageAction'
    }),
    // emit(id) {
    //   this.$emit("emit", id);
    // },
    del(uid) {
      this.$confirm("确定要删除这条数据吗?!!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
         getUserDelete({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getUserAction();
              this.getUserCount()
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    edit(id) {
      // 传递id 给父组件menu公弹窗使用
      this.$emit("edit", id)
    },

    currentChange(e){
        this.changePage(e)
    }
  },
};
</script>

<style lang="" scoped>
.el-pagination {
  float: right;
  margin: 20px 35px 0 0;
}
</style>