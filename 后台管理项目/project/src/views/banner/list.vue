<template>
  <div>
    <el-table
      :data="bannerList"
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180">
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
import { getBannerDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
     bannerList: "banner/getBannerList",
    }),
  },
  mounted() {
    // this.getMenuList();
    this.getBannerListAction();
  },
  methods: {
    ...mapActions({
      getBannerListAction: "banner/getBannerListAction",
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
          getBannerDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              // this.getBannerList();
              this.getBannerListAction();
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
