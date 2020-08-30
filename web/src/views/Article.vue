<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back"></div>
      <strong class="flex-1">{{model.title}}</strong>
      <div class="text-grey fs-xs">{{model.updatedAt | date }}</div>
    </div>
    <div v-html="model.body " class="px-3"></div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  // 过滤器
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  props: {
    // 接收传过来的id
    id: {
      required: true,
    },
  },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
      console.log(this.model);
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style lang="scss">
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>