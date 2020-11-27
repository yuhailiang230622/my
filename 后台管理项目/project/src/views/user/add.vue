<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="roleid"
          label="所属角色"
          :label-width="formLabelWidth"
        >
         <el-select v-model="form.roleid" placeholder="请选择">
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item 
        prop="username"
         label="管理员名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
         <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="状态"
          :label-width="formLabelWidth"
        v-if="form.type === 1">
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
          @click="addz"
          type="primary"
          >添加</el-button
        >

        <el-button @click="upadd" type="primary" v-else
          >修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getUserAdd, getUserInfo, getUserEdit } from "../../util/axios";

// import { indexRoutes } from "../../router";
export default {
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
      //   规则验证
      rules: {
      username: [
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

        roleid:[
            {
                required:true,message:'请选择所属角色',
                trigger:'blur'
            }
        ]
      },
    };
  },

  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.getRoleList();
    }
  },

  props: ["addInfo"],
  methods: {
    reset() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    ...mapActions({
      getRoleList: "role/getRoleAction",
      getUserList:'user/getUserAction',
      getCountAction:'user/getCountAction',
    }),
     cancel() {
      this.$emit("cancel", false);
      this.reset();
    },

    // 查看一条事件
    look(uid) {
      getUserInfo({ uid }).then((res)=> {
          console.log(res,'121321231321231');
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },
    // 添加事件
    addz(formName) {
      console.log(this.form, "88888");
      getUserAdd(this.form).then((res) => {
        console.log(res, "添加响应");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);

          //重新获取列表
          this.getUserList();
          //   重新过去总条数
          this.getCountAction();
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    upadd() {
       getUserEdit(this.form).then((res) => {
        console.log(res, "修改响应");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新获取列表
           this.getUserList();
          // 重新调取总条数
          this.getCountAction()
          //关闭弹框
           this.cancel();
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
