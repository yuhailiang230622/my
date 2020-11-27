
<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>

      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>

      <el-table-column prop="price" label="商品价格" width="">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl + item.row.img" alt="" />
          </div>
        </template>
      </el-table-column>

      <el-table-column label="是否正品" width="70">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否热卖" width="70">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" width="70">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="item">
          <div>
            <el-button type="info" size="small" @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页视图  -->
    <el-pagination
      :page-size="goodsSize"
      background
      layout="prev, pager, next"
      :total="goodsCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getGoodsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
     goodsCount: "goods/getGoodsCount",
      goodsSize: "goods/getGoodsSize"
    }),
  },
  mounted() {
    this.getGoodsAction();
    this.getGoodsCount();
  },
  methods: {
    //获取行动
    ...mapActions({
      getGoodsAction: "goods/getGoodsAction",
      getGoodsCount: "goods/getCountAction",
      changePage: "goods/changePageAction",
    }),
    // emit(id) {
    //   this.$emit("emit", id);
    // },
    del(id) {
      this.$confirm("确定要删除这条数据吗?!!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getGoodsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);

              this.getGoodsAction();
              this.getGoodsCount();
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

    currentChange(e) {
      this.changePage(e);
    },
  },
};
</script>

<style lang="" scoped>
.el-pagination {
  float: right;
  margin: 20px 35px 0 0;
}
.img{
  width: 120px;
}
</style>

