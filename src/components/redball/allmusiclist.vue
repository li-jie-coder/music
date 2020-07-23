<template>
  <div class="body">
    <div class="music_box" v-for="(item, index) in allmusiclist" :key="index">
      <router-link class="pic" tag="div" :to="'/musiclist/'+item.id">
        <div class="music_header">
          <img class="logool" src="../../../static/logool.jpg" alt />
          <van-icon name="play" />
          <div class="lpaycount">{{item.playCount|money}}</div>
        </div>
        <img class="cover" :src="item.coverImgUrl" alt />
        <div class="music_body">{{item.copywriter}}</div>
      </router-link>
      <div class="content">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "allmusiclist",
  created() {
    this.getmusiclists();
  },
  data() {
    return {
      allmusiclist: ""
    };
  },
  filters: {
    money: function(num) {
      num = String(num);
      // console.log(num);
      var a = num.substring(0, num.length - 4);
      if (a == "") {
        a = 0;
      }
      var b = num.substr(num.length - 4, 1);
      return a + "." + b + "万";
    }
  },
  methods: {
    getmusiclists() {
      this.axios.get("/top/playlist/highquality").then(data => {
        // console.log(data.data.playlists);
        this.allmusiclist = data.data.playlists;
      });
    }
  }
};
</script>

<style scoped>
.body {
  width: 100%;
  justify-content: space-around;
}
.music_box {
  margin: 5px;
  float: left;
  width: 30%;
  height: 130px;
}
.pic {
  position: relative;
  height: 80%;
}
.pic .cover {
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.music_header {
  letter-spacing: 1px;
  position: relative;
  color: white;
  font-size: 11px !important;
  text-align: right;
  height: 20px;
  width: 100%;
  text-align: right;
  z-index: 444;
}
.lpaycount {
  display: inline-block;
}
.van-icon-play {
  display: inline-block;
  width: 8px;
  height: 10px;
  vertical-align: middle;
  line-height: 10px;
}

.logool {
  border-radius: 0 0 12px 0;
  float: left;
  width: 13px;
  height: 13px;
}

.music_body {
  overflow: hidden;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 16px;
  color: white;
  position: absolute;
  bottom: 0;
}

.content {
  overflow: hidden;
  height: 21%;
  line-height: 14px;
  font-size: 11px;
  background-color: #fff;
}
</style>