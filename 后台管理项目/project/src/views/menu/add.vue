<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="title"
          label="菜单名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changeMenu"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type === 1"
        >
          <!-- <el-input v-model="form.icon" autocomplete="off"></el-input> -->
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <!-- <el-input v-model="form.url" autocomplete="off"></el-input> -->
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
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
import { mapActions, mapGetters } from "vuex";
import { getMenuAdd, getMenuInfo, getMenuEdit } from "../../util/axios";

import { indexRoutes } from "../../router";
export default {
  data() {
    return {
      form: {
        title: "",
        pid: 0,
        icon: "",
        type: 1,
        url: "",
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
        pid: [{ required: true, message: "请输入上级菜单", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      indexRoutes: indexRoutes,
      iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
        "el-icon-menu",
      ],
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    reset() {
      this.form = {
        title: "",
        pid: 0,
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    // 查看一条事件
    look(id) {
      getMenuInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;

          this.form.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 添加事件
    addz(formName) {
      console.log(this.form,'88888')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getMenuAdd(this.form).then((res) => {
            console.log(res, "添加响应");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getMenuList();
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
      getMenuEdit(this.form).then((res) => {
        // console.log(res, "修改响应");

        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //关闭弹框
          this.cancel();
          //重新获取列表
          this.getMenuList();
        } else {
          this.$message.error(res.data.msg);
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
