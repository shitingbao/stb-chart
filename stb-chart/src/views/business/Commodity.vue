<template>
  <div class="business">
    <div class="block">
      <span class="demonstration">广告选择区</span>
      <el-carousel trigger="click" height="150px" class="carousel">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="select-base">
      <div class="base-title">
        <span>基础入门</span>
        <span>从入门到工作经验</span>
      </div>
      <div>图片选择</div>
    </div>
    <div class="select-expand">
      <div class="expand-title">
        <span>学习路线</span>
        <span>目录选择栏</span>
      </div>
      <div>show</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      brand: {},
      username: "user1"
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
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .carousel {
    width: 1200px;
    justify-content: center;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
