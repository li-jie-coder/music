<template>
  <div class="homecontainer">
    <!-- 轮播图区域  -->
    <van-swipe :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="(item, index) in bannerUrl" :key="index">
        <router-link class="atag" v-if="item.song" :to="'/playing/'+item.targetId"></router-link>
        <img class="imgs" v-lazy="item.pic" />
      </van-swipe-item>
    </van-swipe>

    <!-- 推荐栏 -->
    <div class="recommend">
      <div class="recommend_pic">
        <div class="pic-box">
          <router-link to="/recommendlist">
            <van-icon name="calender-o" size="30" color="white" />
          </router-link>
        </div>
        <span>每日推荐</span>
      </div>
      <div class="recommend_pic">
        <div class="pic-box">
          <router-link to="/allmusiclist">
            <van-icon name="coupon-o" size="30" color="white" />
          </router-link>
        </div>
        <span>歌单</span>
      </div>
      <div class="recommend_pic">
        <div class="pic-box">
          <router-link to="/sort">
            <van-icon name="bar-chart-o" size="30" color="white" />
          </router-link>
        </div>
        <span>新歌</span>
      </div>
      <div class="recommend_pic">
        <div class="pic-box">
          <router-link to="/radiostation">
            <van-icon name="music-o" size="30" color="white" />
          </router-link>
        </div>
        <span>电台</span>
      </div>
      <div class="recommend_pic">
        <div class="pic-box">
          <van-icon name="tv-o" size="30" color="white" />
        </div>
        <span>直播</span>
      </div>
    </div>
    <!-- 热歌 -->
    <div class="hot_music">
      <div class="hot_music_header">
        <h4>宝藏歌单,值得聆听</h4>
        <router-link to="/allmusiclist" tag="div" class="hot_more">查看更多</router-link>
      </div>
      <div class="hot_music_body">
        <div v-for="(item, index) in hotmusicpic" :key="index">
          <router-link :to="'/musiclist/'+item.id">
            <img :src="item.creator.avatarUrl" alt />
            <p class="detail">{{item.name}}</p>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 推荐歌单 -->
    <!-- 华语歌曲 -->
    <div class="chinesemusic">
      <div class="header">
        <h4>网友精选碟</h4>
        <router-link to="/allmusiclist" tag="div" class="chinesemusic_more">
          <van-icon name="play" class="play_icon" size="16" />播放更多
        </router-link>
      </div>
      <div class="body">
        <div v-for="(item, index) in chinesemusic" :key="index">
          <router-link class="musiclist" :to="'/musiclist/'+item.id">
            <img :src="item.coverImgUrl" alt />
            <div class="music_detail">
              <div class="detail_header">
                <span class="music_name">{{item.name}}</span>
                -
                <span class="author">{{item.creator.nickname}}</span>
              </div>
              <div class="detail_body" :title="item.description">{{item.description}}</div>
            </div>
            <van-icon name="play-circle-o" size="28" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";

Vue.use(Lazyload);

export default {
  name: "home",
  created() {
    this.getswipe();
    this.getmusiclist();
    this.gethotmusic();
  },
  data() {
    return {
      bannerUrl: [],
      hotmusicpic: [],
      chinesemusic: []
    };
  },
  methods: {
    getswipe() {
      this.axios.get("/banner?type=2").then(data => {
        // console.log(data.data.banners);
        this.bannerUrl = data.data.banners;
      });
    },
    getmusiclist() {
      this.axios.get("/top/playlist/highquality?limit=3").then(data => {
        // console.log(data.data.playlists);
        this.hotmusicpic = data.data.playlists;
      });
    },
    gethotmusic() {
      this.axios
        .get("/top/playlist?cat:cat:'华语'&order=hot&limit=10")
        .then(data => {
          // console.log(data.data.playlists);
          this.chinesemusic = data.data.playlists;
        });
    }
  }
};
</script>

<style scoped>
.homecontainer {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.homecontainer h4 {
  padding: 5px;
  font-weight: bolder;
  margin: 0;
}
.atag {
  z-index: 222;
  position: absolute;
  height: 100%;
  width: 100%;
}
.imgs {
  width: 100%;
  height: 150px;
  border-radius: 11px;
}

.recommend {
  height: 53px;
  margin-top: 15px;
  display: flex;
}

.recommend .recommend_pic {
  flex: 1;
}
.recommend .recommend_pic .pic-box {
  height: 100%;
  width: 75%;
  margin-left: 12.5%;
  border-radius: 50%;
  background-color: rgb(240, 68, 68);
}
.recommend .recommend_pic span {
  font-size: 12px;
  height: 15px;
  color: #ccc;
}
.van-icon {
  margin-top: 12px;
}

.hot_music {
  height: 150px;
}
a {
  color: #666;
}
.hot_music .hot_music_header {
  border-top: 1px solid rgb(156, 154, 154);
  height: 40px;
  width: 100%;
  margin-top: 27px;
  letter-spacing: 0.1em;
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.hot_music .hot_more {
  font-size: 13px;
  margin-top: 5px;
  width: 23%;
  height: 22px;
  padding: 2px;
  border: 1px solid rgb(190, 186, 186);
  border-radius: 15px;
}
.hot_music .hot_music_body {
  min-height: 160px;
}
.hot_music .hot_music_body div {
  overflow-x: visible !important;
  margin: 5px;
  width: 30%;
  float: left;
}
.hot_music .hot_music_body div img {
  border-radius: 10px;
  width: 98%;
}

.hot_music_body .detail {
  padding: 0;
  margin: 0;
  font-size: 10px;
  width: 100%;
}
.chinesemusic {
  width: 100%;
}

.chinesemusic .header {
  width: 100%;
  margin-top: 77px;
  height: 30px;
  display: flex;
  justify-content: space-between;
}

.chinesemusic .header .chinesemusic_more {
  border: 1px solid #999;
  border-radius: 20px;
  height: 80%;
  width: 25%;
  letter-spacing: 0.1em;
  font-size: 13px;
}

.play_icon {
  padding-top: 5px;
  vertical-align: bottom;
  margin: 0;
}

.body a {
  color: #2c2c2c;
}
.musiclist {
  margin: 12px;
  height: 71px;
  display: flex;
}

.musiclist img {
  margin-right: 12px;
  border-radius: 15px;
  width: 20%;
  flex: 2;
}

.musiclist .music_detail {
  text-align: left;
  display: flex;
  width: 100%;
  overflow: hidden;
  flex: 6;
  flex-direction: column;
  justify-content: space-around;
}

.musiclist .music_detail .music_name {
  font-size: 14px;
}
.musiclist .music_detail .author {
  color: #999;
  font-size: 12px;
}
.musiclist .detail_body {
  color: #999;
  font-size: 12px;
  line-height: 12px;
  height: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.musiclist .van-icon[data-v-093dc610] {
  margin-top: 24px;
  flex: 2;
  color: red;
}
</style>