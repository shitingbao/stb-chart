<template>
  <div class="business">
    <div class="block">
      <span class="demonstration">轮播图</span>
      <el-carousel trigger="click" height="150px" class="carousel">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    展示所有
    <div class="select-base">
      <div class="base-title">
        <span>基础</span>
        <span>第一类</span>
      </div>
      <div>图片选择</div>
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
