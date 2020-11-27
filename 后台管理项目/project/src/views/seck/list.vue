<template>
  <div>
    <el-table :data="seckList" style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>

      <el-table-column prop="status" label="状态" >
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="info" plain @click='edit(item.row.id)'>编辑</el-button>
            <el-button @click='del(item.row.id)' type="danger" plain>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getSeckDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      seckList: "seck/getSeckList",
    }),
  },

  mounted() {
    //组件一加载触发行动
    // this.getRoleAction();
    this.getSeckListAction
  },


  methods: {
    ...mapActions({
      getSeckListAction:'seck/getSeckListAction'
    }),
    del(id) {
      this.$confirm("确定要删除这一条数据吗？？？！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getSeckDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取列表
              this.getSeckListAction()
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
      this.$emit("edit", id);
    },
  },
};
</script>

<style lang="" scoped>
</style>
