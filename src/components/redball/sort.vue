<template>
  <div class="chinesemusic">
    <div class="body">
      <div v-for="(item, index) in sort" :key="index">
        <router-link class="musiclist" :to="'/playing/'+item.id">
          <img :src="item.picUrl" alt />
          <div class="music_detail">
            <div class="detail_header">
              <span class="music_name">{{item.name}}</span>
              -
              <span class="author">{{item.song.album.artists[0].name}}</span>
            </div>
            <div class="detail_body" :title="item.description">{{item.copywriter}}</div>
          </div>
          <van-icon name="play-circle-o" size="28" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sort",
  created() {
    this.getmusiclists();
  },
  data() {
    return {
      sort: ""
    };
  },
  methods: {
    getmusiclists() {
      this.axios.get("/personalized/newsong").then(data => {
        // console.log(data.data.result);
        this.sort = data.data.result;
      });
    }
  }
};
</script>

<style scoped>
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
.musiclist .van-icon-play-circle-o {
  margin-top: 24px;
  flex: 2;
  color: red;
}
</style>