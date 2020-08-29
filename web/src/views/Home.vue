<template>
  <div>
    <div>
      <!-- 轮播图 -->
      <swiper :options="swiperOption">
        <swiper-slide>
          <img class="w-100" src="../assets/images/match/match_01.jpg" alt />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/match/match_02.jpg" alt />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/match/match_03.jpg" alt />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/match/match_04.jpg" alt />
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
    </div>
    <!-- <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="index" v-for="(banner,index) in banners">
        <img class="w-100" src="../assets/images/new_hero.jpg" alt />
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
    <div class="swiper-pagination"></div>
    </div>-->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>

    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <!-- #为2.6的新语法 v-slot的缩写。例如 v-slot:header 可以被重写为 #header-->
      <!-- 和其它指令一样，该缩写只在其有参数的时候才可用 -->
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">
            {{
            news.title
            }}
          </span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%;"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-card icon="cc-menu-circle" title="精彩视频"></m-card>
    <m-card icon="cc-menu-circle" title="图文攻略"></m-card>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home",
        },
      },
      newsCats: [],
      heroCats: [],
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
};
</script>

<style lang="scss">
@import "../assets/variables.scss";
@import "../assets/style.scss";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
