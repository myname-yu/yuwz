<template>
  <div class="notFound">
    <p>404：找不到该页面，将会在{{countDown}}秒后跳转到首页</p>
    <img class="w-100" src="../assets/images/error404.jpg" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      countDown: 5,
      timer: null,
    };
  },
  methods: {
    countDownFn() {
      this.timer = setInterval(() => {
        this.countDown--;
        console.log(this.countDown);
        if (this.countDown == 0) {
          this.$router.push("/");
        }
      }, 1000);
    },
  },
  created() {
    this.countDownFn();
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>
