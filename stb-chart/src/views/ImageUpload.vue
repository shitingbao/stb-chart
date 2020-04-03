<template>
  <div>
    <Upload />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Upload from "../components/Upload.vue";
export default Vue.extend({
  name: "ImageUpload",
  components: {
    Upload
  },
  methods: {
    getName: function(name) {
      name += "hello";
      return name;
    }
  }
});
</script>
