<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
      @opened="createEditor"
    >
      <el-form ref="rules" :model="form" :rules="rules">
        <el-form-item
          prop="first_cateid"
          label="一级分类:"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.first_cateid" @change="changeCate(false)">
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

        <el-form-item
          prop="second_cateid"
          label="二级分类:"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.second_cateid">
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

       <el-form-item
          prop="goodsname"
          label="商品名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.goodsname" autocomplete="off">
            
          </el-input>
        </el-form-item>
        <!-- ------------------------- -->
        <el-form-item
          prop="price"
          label="商品价格:"
          :label-width="formLabelWidth"
        >
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="market_price"
          label="市场价格:"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.number="form.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="specsname"
          label="图片:"
          :label-width="formLabelWidth"
        >
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item
          prop="specsid"
          :label-width="formLabelWidth"
          label="商品规格"
        >
          <el-select v-model="form.specsid" @change="changeSpecs(false)">
            <el-option value label="请选择" disabled></el-option>
            <!-- 调取商品规格列表接口 -->
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="specsattr"
          :label-width="formLabelWidth"
          label="规格属性"
        >
          <!-- multiple	是否多选 -->
          <el-select v-model="form.specsattr" multiple>
            <el-option value label="请选择" disabled></el-option>
            <!-- 循环联动选择的规格 -->
            <el-option
              v-for="item in attrArr"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item label="商品描述:" :label-width="formLabelWidth">
          <!-- 这个标签中插入富文本编辑器 -->
          <div id="editor"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>

        <el-button v-if="addInfo.isAdd" @click="addz" type="primary"
          >添加</el-button
        >

        <el-button v-else @click="upadd" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import {
  getGoodsAdd,
  getGoodsInfo,
  getGoodsEdit,
  getGoodsList,
} from "../../util/axios";

export default {
  data() {
    return {
      form: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品 1是 2否
        ishot: 1, //是否热卖推荐1是 2否
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      //   规则验证
      rules: {
        goodsname: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 8,
            message: "长度在2到8个字符",
            trigger: "blur",
          },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "商品价格必须为数字" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { type: "number", message: "市场价格必须为数字" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
      dialogImageUrl: "", //预览的图片地址
      dialogVisible: false, //是否打开弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
      secondArr: [], //二级分类数组
      attrArr: [], //规格属性的数组
    };
  },
  props: ["addInfo"],
  // mounted() {
  //   if (this.roleList.length == 0) {
  //     this.getRoleList();
  //   }
  // },
  mounted() {
    this.getSpecsList();
    this.getCateList();
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
      specsList: "specs/getSpecsList",
    }),
  },
  methods: {
    //  富文本编译器 打开弹窗就加载富文本编译器
    createEditor() {
      // console.log("富文本被创建");
      //先实例化富文本
      this.editor = new E("#editor");
      //调用富文本编辑器 create方法
      this.editor.create();
      //设置内容 设置表单描述信息参数
      this.editor.txt.html(this.form.description);
      console.log(this.editor, "编辑器对象");
    },
    // 点击一级分类触发change事件
    changeCate(n) {
      let index = this.cateList.findIndex((item, i) => {
        // console.log(item, i, "每一项");
        return this.form.first_cateid == item.id;
      });
      // console.log(index, "索引");
      this.secondArr = this.cateList[index].children;
      console.log(this.secondArr, "二级分类数组");
      //进行联动判空。如果你选择了别的一级，那么清空上一次二级的选择值
      if (!n) {
        console.log("false进来");
        //清空联动二级的双向数据绑定
        this.form.second_cateid = "";
      }
    },
    // 点击商品规格触发的change事件
    changeSpecs(n) {
      console.log(n, "specs,iddd");
      console.log(this.form.specsid, "this.form.specsid");
      let index = this.specsList.findIndex(
        (item) => this.form.specsid == item.id
      );
      this.attrArr = this.specsList[index].attrs;
      //清空二级联动信息
      if (!n) {
        this.form.specsattr = [];
      }
    },
    //图片删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片上传触发change
    onChange(file) {
      console.log(file, "文件");
      this.imgUrl = file.raw;
    },
    //文件上传限制
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    reset() {
      this.form = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品 1是 2否
        ishot: 1, //是否热卖推荐1是 2否
        status: 1, //状态1正常2禁用
      };
      this.fileList = [];
      this.secondArr = [];
      this.attrArr = [];
      this.$refs = ["rules"].resetFields();
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    // 调取行动
    ...mapActions({
      getSpecsList: "specs/getSpecsAction",
      
      getCateList: "cate/getCateListAction",

      getGoodsList: "goods/getGoodsAction",

      getGoodsCount: "goods/getCountAction",
    }),

    // 查看一条事件
    look(id) {
      getGoodsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.list;
          this.form = data;
          this.form.id = id;
          //点击打开弹框给图片列表赋值
          this.fileList = this.form.img
            ? [{ url: this.$imgUrl + this.form.img }]
            : [];
          //点击打开弹框，给属性值进行二次数据整合
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.split(",")
            : [];
          //重新调取change事件
          this.changeCate(true);
          //防止 规格属性概率问题
          this.changeSpecs(true);
        }
      });
    },
    // 添加事件
     addz() {
      this.form.specsattr = this.form.specsattr
        ? this.form.specsattr.join(",")
        : "";
      //重新获取图片地址
      this.form.img = this.imgUrl;
      //给描述信息设置内容
      console.log(this.form, "商品管理的表单信息");
      //把编辑器中的内容设置给我的描述参数
      this.form.description = this.editor.txt.html();
      console.log(this.form, "商品管理的表单信息");
      //因为有上传文件，所以不能是普通表单对象，要是formData
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      getGoodsAdd(file).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getGoodsList();
          //重新调取总条数
          this.getGoodsCount();
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    upadd() {
      this.form.specsattr = this.form.specsattr
        ? this.form.specsattr.join(",")
        : "";

      //重新获取图片地址
      this.form.img = this.imgUrl;
      //把编辑器中的内容设置给我的描述参数
      this.form.description = this.editor.txt.html();
      console.log(this.form, "商品管理的表单信息");
      //因为有上传文件，所以不能是普通表单对象，要是formData
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      // console.log(this.form,'表单信息')
      //调取添加接口

      getGoodsEdit(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getGoodsList();
          //重新调取总条数
          this.getGoodsCount();
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.inputW {
  width: 70%;
}
</style>
