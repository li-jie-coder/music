<template>
  <div class="cmdmusic_list">
    <div class="cover">
      <img :src="coverUrl" alt />
    </div>
    <div class="music_list">
      <div class="music_header">
        <div class="playall">
          <van-icon name="play-circle-o" size="25" />播放全部
          <span>(共{{allmusic}}首)</span>
        </div>
        <van-button class="favorite" type="danger">+ 收藏（{{favorite |money}}）</van-button>
      </div>

      <div v-for="(item,index) in musiclist" :key="item.id" class="musics">
        <div class="number">{{index+1}}</div>
        <div class="song">
          <router-link class="routerto" :to="'/playing/'+item.id">
            <div class="song_name">{{item.name}}</div>
            <div class="song_user">{{item.ar[0].name}}{{item.alia[0]?" - "+item.alia:''}}</div>
          </router-link>
        </div>
        <router-link :to="'/mv/'+item.mv" tag="div" class="mv_icon">
          <van-icon class="video_icon" v-if="item.mv" name="video-o" size="22" />
        </router-link>
        <van-icon class="music_more" name="ellipsis" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "musiclist",
  created() {
    this.getmusiclists();
  },
  data() {
    return {
      id: this.$route.params.id,
      coverUrl: "",
      musiclist: "",
      allmusic: "",
      favorite: ""
    };
  },
  filters: {
    money: function(num) {
      num = String(num);
      // console.log(num);
      var a = num.substring(0, num.length - 4);
      var b = num.substr(num.length - 4, 1);
      return a + "." + b + "万";
    }
  },
  methods: {
    getmusiclists() {
      this.axios.get("/playlist/detail?id=" + this.id).then(data => {
        // console.log(data.data.playlist);
        this.musiclist = data.data.playlist.tracks;

        this.coverUrl = data.data.playlist.coverImgUrl;
        this.allmusic = data.data.playlist.trackCount;
        this.favorite = data.data.playlist.playCount;
      });
    }
  }
};
</script>

<style scoped>
.cmdmusic_list {
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
  width: 100%;
}
.cmdmusic_list .cover img {
  width: 110%;
  position: absolute;
  left: 0;
  top: 0px;
  height: 300px;
}
.cmdmusic_list {
  height: 850px;
  width: 100%;
  position: relative;
}
.cmdmusic_list .music_list {
  width: 100%;
  height: 500px;
  position: absolute;
  border-radius: 15px;
  padding: 4px;
  left: 0;
  top: 200px;
  background-color: #fff;
}
.cmdmusic_list .music_list .musics {
  background-color: #fff;
}

.music_header {
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
}
.van-icon-play-circle-o:before {
  vertical-align: middle;
  margin-right: 5px;
}
.playall {
  font-weight: bolder;
}

.playall span {
  letter-spacing: 0.5px;
  font-size: 14px;
  font-weight: normal;
  color: #cecaca;
}
.favorite {
  height: 40px;
  border-radius: 22px;
  background-color: rgb(228, 76, 76);
}

.musics {
  display: flex;
  margin-top: 10px;
  height: 50px;
  width: 100%;
  background-color: pink;
}

.number {
  text-align: center;
  line-height: 50px;
  color: #999;
  flex: 1;
  margin-right: 5px;
}

.song {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  flex: 7;
}
.routerto {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  flex: 1;
}
.song_name {
  color: rgba(0, 0, 0, 0.637);
  font-weight: 550;
  font-size: 15px;
}

.song_user {
  color: #999;
  font-size: 13px;
}

.mv_icon {
  flex: 1;
  line-height: 67px;
  z-index: 2;
}

.music_more {
  margin-top: 7px;
  margin-left: -15px;
  margin-right: 10px;
  flex: 1;
  transform: rotate(90deg);
}
</style>