<!-- 菜单新增修改组件 -->
<template>
  <div>
    <button @click="test">test</button>
    <el-dialog
      :title="!dataForm.id ? '新增' : '修改'"
      width="35%"
      @close="$reset('dataForm')"
      :visible.sync="showDialog"
    >
      <el-form :model="dataForm" ref="dataForm" label-width="80px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="dataForm.type" style="width: 95%" placeholder="点击选择">
            <el-option v-for="(item) in dataForm.typeList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'菜单名'" prop="name">
          <el-input
            v-model="dataForm.name"
            style="width: 95%"
            :placeholder="'请输入'+dataForm.type + '名'"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentName">
          <el-popover ref="menuListPopover" placement="bottom-start" trigger="click">
            <el-tree
              :data="menuList"
              :props="defaultProps"
              node-key="id"
              ref="menuListTree"
              @current-change="menuListTreeCurrentChangeHandle"
              :highlight-current="true"
              :expand-on-click-node="false"
            ></el-tree>
          </el-popover>
          <el-input
            v-model="dataForm.parentName"
            style="width: 95%"
            v-popover:menuListPopover
            :readonly="true"
            placeholder="点击选择上级菜单"
            class="menu-list__input"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="dataForm.type == 'click'" label="key" prop="key">
          <el-input v-model="dataForm.key" style="width: 95%" placeholder="key"></el-input>
        </el-form-item>

        <el-form-item
          v-if="dataForm.type == 'view' || dataForm.type == 'miniprogram' "
          label="url"
          prop="url"
        >
          <el-input v-model="dataForm.url" style="width: 95%" placeholder="url"></el-input>
        </el-form-item>

        <el-form-item v-if="dataForm.type == 'miniprogram'" label="appid" prop="appid">
          <el-input v-model="dataForm.appid" style="width: 95%" placeholder="appid"></el-input>
        </el-form-item>

        <el-form-item v-if="dataForm.type == 'miniprogram'" label="pagepath" prop="pagepath">
          <el-input v-model="dataForm.pagepath" style="width: 95%" placeholder="pagepath"></el-input>
        </el-form-item>

        <el-form-item label="排序号" prop="orderNum">
          <el-input-number
            v-model="dataForm.orderNum"
            controls-position="right"
            :min="0"
            label="排序号"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeChangeDialog(0)" :disabled="disabled">取 消</el-button>
        <el-button type="primary" @click="closeChangeDialog(1)" :disabled="disabled">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import https from "@/services/https.js";

export default {
  data() {
    return {
      // 按钮可用状态
      disabled: false,
      showDialog: false,
      addOrUpdate: "",
      radio: "0",

      dataForm: {
        id: null,
        type: "",
        typeList: [
          "directory",
          "click",
          "view",
          "scancode_push",
          "miniprogram"
        ],
        name: "",
        orderNum: 0,
        key: "",
        url: "",
        appid: "",
        pagepath: "",
        parentId: null,
        parentName: "",
        fatherMenu: {
          id: ""
        }
      },
      menuList: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    test() {
      console.log("ch:", this.dataForm.children);
    },
    init(curId) {
      //   let vm = this;
      this.dataForm.id = curId || null;
      //   https
      //     .get("/bdata/wxbutton/fatherWxBtn")
      //     .then(res => {
      //       vm.menuList = res.data;
      //       alert(curId);
      //       if (curId != null) {
      //         alert(curId + "~~~~");
      //         https
      //           .get("/bdata/wxbutton/info/" + curId)
      //           .then(res => {
      //             vm.dataForm.id = res.data.wxButton.id;
      //             vm.dataForm.type = res.data.wxButton.type;
      //             vm.dataForm.name = res.data.wxButton.name;
      //             vm.dataForm.key = res.data.wxButton.key;
      //             vm.dataForm.parentName = res.data.wxButton.fatherWxButton.name;
      //             vm.dataForm.parentId = res.data.wxButton.fatherWxButton.id;
      //             vm.dataForm.url = res.data.wxButton.url;
      //             vm.dataForm.orderNum = res.data.wxButton.orderNum;
      //             vm.dataForm.appid = res.data.wxButton.appid;
      //             vm.dataForm.pagepath = res.data.wxButton.pagepath;
      //           })
      //           .catch(err => {
      //             vm.$message(err);
      //           });
      //       }
      //     })
      //     .catch(err => {
      //       vm.$message(err);
      //     });
    },
    setVisible() {
      this.showDialog = true;
    },

    // 确定、取消，然后关闭面板，提交数据
    closeChangeDialog(type) {
      //   let vm = this;
      this.disabled = true;

      if (type == 1) {
        // 确定新增
        // let methodName = !vm.dataForm.id ? "save" : "update";
        let param = {
          id: this.dataForm.id,
          name: this.dataForm.name,
          children: this.dataForm.children,
          fatherWxButton: {
            id: this.dataForm.parentId
          },
          key: this.dataForm.key,
          url: this.dataForm.url,
          appid: this.dataForm.appid,
          type: this.dataForm.type,
          pagepath: this.dataForm.pagepath,
          orderNum: this.dataForm.orderNum
        };
        console.log(param);
        // 新增
        // https
        //   .post("/bdata/wxbutton/" + methodName, param)
        //   .then(res => {
        //     vm.disabled = false;
        //     if (res.data.code == 0) {
        //       if (!vm.dataForm.id) {
        //         vm.$message("新增成功");
        //       } else {
        //         vm.$message("修改成功");
        //       }
        //       vm.showDialog = false;
        //       vm.$emit("onUpdateList", type);
        //     } else {
        //       let msg = res.data.msg ? res.data.msg : "请求失败";
        //       vm.$message({
        //         dangerouslyUseHTMLString: true,
        //         message: "<p>" + msg + "</p>"
        //       });
        //     }
        //   })
        //   .catch(err => {
        //     vm.$message(err);
        //     vm.disabled = false;
        //     vm.$emit("onUpdateList", type);
        //   });
      } else if (type == 2) {
        // 修改
      } else {
        // 取消
        this.showDialog = false;
        this.$emit("onUpdateList", type);
      }
    },
    // 选中的上级菜单节点
    menuListTreeCurrentChangeHandle(data, node) {
      // 切换节点
      this.dataForm.parentId = data.id;
      this.dataForm.parentName = data.name;
      console.log(node);
    }
  }
};
</script>
<style lang='scss'>
</style>
