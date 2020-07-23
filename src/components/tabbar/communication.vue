<template>
  <div class="body">
    <!-- 轮播图区域  -->
    <van-swipe :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="(item, index) in recommendmv" :key="index">
        <router-link :to="'/videoplaying/'+item.targetId"></router-link>
        <img class="imgs" v-lazy="item.picUrl" />
      </van-swipe-item>
    </van-swipe>

    <!-- 最新mv区域  -->
    <div class="newmv">
      <h5>最新mv</h5>
      <router-link
        tag="div"
        :to="'/mv/'+item.id"
        class="mv_box"
        v-for="(item, index) in mvs"
        :key="index"
      >
        <img :src="item.cover" alt />
        <div class="content">{{item.name}}</div>
      </router-link>
    </div>

    <!-- 网易出品mv区域  -->
    <div class="newmv">
      <h5>网易出品mv</h5>
      <router-link
        tag="div"
        :to="'/mv/'+item.id"
        class="mv_box"
        v-for="(item, index) in privacy"
        :key="index"
      >
        <img :src="item.cover" alt />
        <div class="content">{{item.name}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";

Vue.use(Lazyload);
export default {
  name: "communication",
  data() {
    return {
      recommendmv: "",
      mvs: "",
      privacy: ""
    };
  },
  created() {
    this.getmv();
    this.getrecommendmv();
    this.getprivacy();
  },
  methods: {
    getrecommendmv() {
      this.axios.get("/personalized/mv").then(data => {
        // console.log(data.data.result);
        this.recommendmv = data.data.result;
      });
    },
    getmv() {
      this.axios.get("/mv/first?limit=6").then(data => {
        // console.log(data.data.data);
        this.mvs = data.data.data;
      });
    },

    getprivacy() {
      this.axios.get("/mv/exclusive/rcmd").then(data => {
        // console.log(data.data.data);
        this.privacy = data.data.data;
      });
    }
  }
};
</script>

<style scoped>
.body {
  height: 2915px;
}
.imgs {
  width: 100%;
  height: 150px;
  border-radius: 11px;
}

.newmv {
  height: 300px;
}
h5 {
  text-align: left;
}

.mv_box {
  width: 50%;
  float: left;
  height: 147px;
  padding: 5px;
}
.mv_box img {
  width: 100%;
  box-shadow: 2px 2px 7px rgb(78, 77, 77);
  height: 100px;
}
.mv_box .content {
  width: 100%;
  font-size: 12px;
  height: 35px;
  line-height: 17.5px;
  overflow: hidden;
}
</style>