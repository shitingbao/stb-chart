
<template>
  <div>
    <div>文件选择1</div>
    <div>文件选择2</div>
    <el-button type="primary" plain>生成并下载excel文件</el-button>
  </div>
</template>

<script>
export default {
  name: "FileComparison",
  data() {
    return {
      msg: "FileComparison"
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {}
  }
};
</script>
