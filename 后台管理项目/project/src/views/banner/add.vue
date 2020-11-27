<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item prop="title" label="标题">

          <el-input v-model="form.title" autocomplete="off"></el-input>
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
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../util/axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        title: "",
        img: "",
        status: 1,
      },
      rules: {
        title: [
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
      },
      formLabelWidth: "120px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
    };
  },
  props: ["addInfo"],

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
        title: "",
        img: "",
        status: 1,
      };
      this.fileList=[]
    },
    ...mapActions({
      getBannerList: "banner/getBannerListAction",
    }),
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    // 查看一条事件
    look(id) {
      getBannerInfo({ id }).then((res) => {
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

          getBannerAdd(file).then((res) => {
            console.log(res, "添加响应");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getBannerList();
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
          getBannerEdit(file).then((res) => {
            console.log(res, "修改响应");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getBannerList();
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
