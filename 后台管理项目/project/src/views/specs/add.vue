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
          prop="specsname"
          label="规格名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          v-for="(item, index) in arrAttr"
          :key="index"
          label="规格属性:"
          :label-width="formLabelWidth"
        >
          <el-input
            class="inputW"
            v-model="item.value"
            autocomplete="off"
          ></el-input>

          <el-button
           v-if="index==0" 
          @click="addAttr"
           type="primary">新增规格属性
           </el-button>
          <el-button v-else @click="delAttr(item)" type="danger">删除</el-button>
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

        <el-button v-if="addInfo.isAdd" @click="addz" type="primary"
          >添加</el-button
        >

     <el-button v-else @click="upadd" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";

export default {
  data() {
    return {
      arrAttr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      formLabelWidth: "120px",
      //   规则验证
      rules: {
        specsname: [
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

        roleid: [
          {
            required: true,
            message: "请选择所属角色",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: ["addInfo"],
  // mounted() {
  //   if (this.roleList.length == 0) {
  //     this.getRoleList();
  //   }
  // },

 
  methods: {
    addAttr() {
      if (this.arrAttr.length <= 6) {
        this.arrAttr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加6项");
      }
    },
     //删除冬天表单事件
    delAttr(item) {
      var index = this.arrAttr.indexOf(item);
      if (index !== -1) {
        this.arrAttr.splice(index, 1);
      }
    },

    reset() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.arrAttr = [
        {
          value: "",
        },
      ];
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getSpecsList: "specs/getSpecsAction",
      getCountAction: "specs/getCountAction",
    }),

    // 查看一条事件
    look(id) {
      getSpecsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.list[0];
          this.form = data
          data.attrs.map((item, index) => {
            if (index == 0) {
              this.arrAttr[0].value = item;
            } else {
              this.arrAttr.push({
                value:item
              });
            }
          });
        }
      });
    },
    // 添加事件
    addz() {
      this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      getSpecsAdd(this.form).then((res) => {
        console.log(res, "添加响应");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);

          //重新获取列表
          this.getSpecsList();
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
      // console.log(this.form,'表单信息')
       this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      getSpecsEdit(this.form).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getSpecsList();
          //重新调取总条数
          this.getCountAction();
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
