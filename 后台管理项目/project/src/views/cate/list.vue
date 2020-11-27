<template>
  <div>
    <el-table
      :data="cateList"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl + item.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
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
            <el-button type="primary" size="small" @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.id)">删除
              
            </el-button>
              
          </div>
        </template>
        </el-table-column>
      </el-table>
  </div>
</template>
     
<script>
import { mapGetters, mapActions } from "vuex";
import { getCateDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  mounted() {
    // this.getMenuList();
    this.getCateListAction();
  },
  methods: {
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
    }),
    emit(id) {
      this.$emit("emit", id);
    },
    del(id) {
      this.$confirm("确定要删除这条数据吗?!!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getCateDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              // this.getMenuList();
              this.getCateListAction();
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
      this.$emit("edit", id);
    },
  },
};
</script>

<style lang="" scoped>
.img{
  width: 200px;
  height: 200px;
}
</style>
