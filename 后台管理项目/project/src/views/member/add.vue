<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加角色' : '修改角色'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"> </el-input>

          <el-form-item
            prop="nickname"
            label="昵称:"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码:" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
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

        <el-button type="primary" @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getMemberInfo, getMemberEdit } from "../../util/axios";
export default {
  data() {
    return {
      // 表单对象
      form: {
        nickname: "", // 昵称
        phone: "", //手机号
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        nickname: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
 


  props: ["addInfo"],

  methods: {
    reset() {
      this.form = {
        nickname: "", // 昵称
        phone: "", //手机号
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
    },

    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    look(id) {
      getMemberInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },

    update() {
      // this.form.menus = JSON.stringify();
      getMemberEdit(this.form).then((res) => {
        if (res.data.code == 200) {
        this.$message.success(res.data.msg);
        this.getMemberList();
        this.cancel();
        }else{
          this.$message.error(res.data.msg)
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
