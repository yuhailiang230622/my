<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加角色' : '修改角色'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="rolename"
        >
          <el-input v-model="form.rolename" autocomplete="off"> </el-input>

          <el-form-item label="角色权限:" :label-width="formLabelWidth">
            <!-- el-tree 属性
            data	展示数据	array
            default-expand-all	是否默认展开所有节点
            node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
            props	配置选项，具体看下表	object
            show-checkbox	节点是否可被选择 -->
            <el-tree
              :data="menuList"
              default-expand-all
              node-key="id"
              ref="tree"
              :props="{
                children: 'children',
                label: 'title',
              }"
              show-checkbox
            >
            </el-tree>
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
          </el-form-item>
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
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util/axios";
export default {
  data() {
    return {
      // 表单对象
      form: {
        rolename: "", //角色名称
        rolename: "", //角色权限
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },

  mounted() {
    console.log(this.addInfo,'132131');
    if (this.menuList.length == 0) {
      this.getmenuList();
    }
  },

  props: ["addInfo"],

  methods: {
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },

    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getmenuList: "menu/getMenuListAction",
      getRoleList: "role/getRoleAction",
    }),

    add() {
      // this.form.menus = JSON.stringify();
      this.form.menus=this.$refs.tree.getCheckedKeys().join(',')
      getRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getRoleList();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    look(id) {
      getRoleInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.menus = this.form.menus? this.$refs.tree.setCheckedKeys( this.form.menus.split(','))  :[]
          this.form.id = id;
        }
      });
    },

    update() {
      // this.form.menus = JSON.stringify();
      this.form.menus=this.$refs.tree.getCheckedKeys().join(',')
      getRoleEdit(this.form).then((res) => {
        // if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getRoleList();
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
