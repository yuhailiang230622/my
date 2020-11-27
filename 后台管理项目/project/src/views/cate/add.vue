<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item prop="pid" label="上级分类">
          <!-- <el-input v-model="form.url" autocomplete="off"></el-input> -->
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="catename" label="分类名称">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <!--  上传文件 -->
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
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

          <!-- <el-upload class="avatar-uploader" action="#"> </el-upload> -->
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 可以使用active-color属性与inactive-color属性来设置开关的背景色。 -->
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

        <el-button
          v-if="addInfo.isAdd"
          @click="addz('formDialog')"
          type="primary"
          >添加</el-button
        >

        <el-button @click="upadd('formDialog')" type="primary" v-else
          >编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCateAdd, getCateInfo, getCateEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        pid: 0,
        catename: "", //商品分类名称
        img: "",
        // url: "",
        status: 1,
      },
      rules: {
        catename: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 20,
            message: "长度在2到20个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请输入上级菜单", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      // dialogVisible='',
      // dialogImageUrl='',
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  methods: {
    onChange(file) {
      this.imgUrl = file.raw;
    },

    // 图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onRemove(file, fileList) {},
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    reset() {
      this.form = {
        // title: "",
        pid: 0,
        catename: "",
        // pid: 0,
        // icon: "",
        // type: 1,
        // url: "",
        img: "",
        status: 1,
      };
    },
    ...mapActions({
      getCateList: "cate/getCateListAction",
    }),
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    // 查看一条事件
    look(id) {
      getCateInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;

          this.form.id = id;
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 添加事件
    addz(formName) {
      // console.log(this.form, "88888");

      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.form;
          let file = new FormData();

          for (let i in data) {
            file.append(i, data[i]);
          }
          file.append("img", this.imgUrl);

          getCateAdd(file).then((res) => {
            console.log(res, "添加响应");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getCateList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    upadd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //修改逻辑
          //调取修改接口
          //把数据修改成formData形式
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          //如果你新传了图片 this.imgUrl就有值。就赋值给this.imgUrl。如果没有新添加的图片就用上一次的图片
          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);
          getCateEdit(file).then((res) => {
            console.log(res, "修改响应");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getCateList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeMenu() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
  },
};
</script>

<style lang="" scoped>
</style>
