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
    <div class="select-base">
      <div class="base-title">
        <span>基础</span>
        <span>第一类</span>
      </div>
      <div class="base-list">
        <div @click="chat">在线交友</div>
        <div @click="commoditylist">商品优选</div>
        <div>学习教材</div>
        <div>关于我们</div>
      </div>
    </div>
    <div class="select-expand">
      <div class="expand-title">
        <span>介绍</span>
      </div>
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
  methods: {
    commoditylist() {
      // this.$router.push({ name: "commoditylist" });
      let routeData = this.$router.resolve({ name: "commoditylist" });
      window.open(routeData.href, "_blank");
    },
    chat() {
      let routeData = this.$router.resolve({ name: "chathome" });
      window.open(routeData.href, "_blank");
    }
  }
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
  .base-list {
    display: flex;
    flex-direction: row;
    div {
      margin: 20px 20px 20px 20px;
      width: 200px;
      height: 200px;
      cursor: pointer;
    }
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
