<template>
  <div>
    <div>列头</div>
    <div>主题</div>
    <div class="block">
      <span class="demonstration">大于 7 页时的效果</span>
      <el-pagination layout="prev, pager, next" :total="1000"> </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      brand: {}
    };
  },
  mounted() {},
  created: function() {},
  methods: {}
};
</script>
<style lang="scss">
.business {
  display: flex;
}
</style>
