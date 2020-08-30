<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{active: active === i}"
        v-for="(category, i) in categories"
        :key="i"
        @click="active= $refs.list.swiper.slideTo(i)"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <!-- ref就像是dom里面的ID -->
      <swiper
        ref="list"
        :options="{autoHeight: true}"
        @slide-change="() => active = $refs.list.swiper.realIndex"
      >
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  created() {
    // console.log(this.$refs.list);
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
</style>
