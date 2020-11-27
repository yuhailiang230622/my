<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加秒杀管理' : '修改秒杀管理'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="秒杀管理名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item label="活动期限:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="一级分类">
          <el-select v-model="form.first_cateid" @change="changeCate()">
            <el-option value label="请选择" disabled></el-option>
            <!-- 调取商品分类的列表接口 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="二级分类">
          <el-select v-model="form.second_cateid" @change="changeGoods()">
            <!-- 二级分类一定是根据一级分类选择之后的联动信息 -->
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商品">
          <el-select v-model="form.goodsid">
            <!-- 二级分类一定是根据一级分类选择之后的联动信息 -->
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>

        <el-button type="primary" v-if="addInfo.isAdd" @click="add"
          >添加</el-button
        >
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  getSeckAdd,
  getSeckInfo,
  getSeckEdit,
  getGoodsList,
} from "../../util/axios";
export default {
  data() {
    return {
      // 表单对象
      form: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      },
      timer: "", //日期
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      secondArr: [],
      goodsArr: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },

  mounted() {
    if (this.cateList.length == 0) {
      this.getCateListAction();
    }
  },

  props: ["addInfo"],

  methods: {
    //点击一级分类获取二级分类列表
    changeCate(n) {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondArr = this.cateList[index].children;
      //清空二级双向数据绑定还要清空三级
      if (!n) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    //点击二级分类调取商品列表
    changeGoods(n) {
      //调取商品列表接口
      getGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodsArr = res.data.list;
          //清空二级双向数据绑定还要清空三级
          if (!n) {
            this.form.goodsid = "";
          }
        }
      });
    },
    reset() {
      this.form = {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      };
      this.timer = "";
    },

    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
      getSeckListAction: "seck/getSeckListAction",
    }),

    add() {
      this.form.begintime = new Date(this.timer[0]).getTime();
      this.form.endtime = new Date(this.timer[1]).getTime();

      getSeckAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSeckListAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    look(id) {
      getSeckInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.timer = [
            new Date(parseFloat(this.form.begintime)),
            new Date(parseFloat(this.form.endtime)),
          ];
          // 清空之前的双向数据绑定
          this.changeCate(true);
          this.changeGoods(true);
        }
      });
    },

    update() {
     
      // this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      getSeckEdit(this.form).then((res) => {
        // if (res.data.code == 200) {
        this.$message.success(res.data.msg);
        this.getSeckListAction()
        this.cancel();
        // } else {
        //   this.$message.error(res.data.msg);
        // }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
