<template>
  <div>
    <Upload />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Upload from "../components/Upload.vue";
export default Vue.extend({
  name: "imageload",
  components: {
    Upload
  }
});
</script>