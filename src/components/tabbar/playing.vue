<template>
  <div class="playing">
    <aplayer
      :music="{
        src:musicurl,
        title:titles,
        artist:authors,
        pic:cover,
        lrc:mylrc
        }"
      class="player"
      showLrc
      :volume="0.5"
    />

    <div class="nolrc" v-if="flag">
      <p>无歌词加载</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Aplayer from "vue-aplayer";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "playing",
  mounted() {
    this.playmusic();
    this.getcover();
    this.privacy();
    this.getlyric();
  },
  data() {
    return {
      id: this.$route.params.id,
      musicurl: "",
      cover: "",
      authors: "",
      titles: "",
      mylrc: "",
      flag: false
    };
  },
  methods: {
    async playmusic() {
      await this.axios.get("/song/url?id=" + this.id).then(data => {
        // console.log(data.data.data[0]);
        this.musicurl = data.data.data[0].url;
      });
    },
    async getcover() {
      await this.axios.get("/song/detail?ids=" + this.id).then(data => {
        // console.log(data.data.songs[0]);
        this.cover = data.data.songs[0].al.picUrl;
        this.authors = data.data.songs[0].ar[0].name;
        this.titles = data.data.songs[0].name;
      });
    },
    async privacy() {
      await this.playmusic();
      await this.getcover();
      if (!this.musicurl) {
        Toast("本歌曲需要开通会员才可以收听哦");
      }
    },
    async getlyric() {
      this.axios.get("/lyric?id=" + this.id).then(data => {
        // console.log(data.data.lrc);
        if (data.data.lrc) {
          this.mylrc = data.data.lrc.lyric;
        } else {
          this.mylrc = "无歌词";
          this.flag = true;
        }
      });
    }
  },
  components: {
    Aplayer
  }
};
</script>
<style>
.playing {
  background-color: rgba(226, 223, 223, 0.493);
  width: 100%;
  padding: 0 !important;
  height: 700px;
  position: relative;
}
.playing img {
  position: absolute;
  opacity: 0.8;
  left: 0;
  top: 0;
  width: 100%;
}

.privacy {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 50px;
}

.audio {
  position: absolute;
  border-radius: 0 !important;
  width: 100%;
  left: 0;
  bottom: 0;
}
.aplayer-withlrc {
  margin: 0 !important;
}
.aplayer-body {
  position: relative !important;
  height: 720px;
  margin: 0 !important;
}
.aplayer-play,
.aplayer-pause {
  position: absolute !important;
  left: 180px !important;
}
.aplayer-controller {
  position: absolute !important;
  height: 50px !important;
  width: 100%;
  bottom: 0px;
  background-color: rgba(248, 232, 232, 0.363);
}
.aplayer-controller p {
  font-size: 17px !important;
}
.aplayer-bar {
  border-radius: 5px !important;
  height: 6px !important;
}
.aplayer-loaded {
  background-color: rgba(255, 255, 255, 0.363) !important;
  border-radius: 5px !important;
  height: 6px !important;
}
.aplayer-played {
  border-radius: 5px !important;
  height: 6px !important;
}
.aplayer-thumb {
  margin-right: -14px !important;
  margin-top: -3px !important;
}
.aplayer-info {
  position: absolute !important;
  bottom: 12px !important;
  left: 0 !important;
  width: 100%;
  padding: 0 !important;
  height: 350px !important;
}

.aplayer-music {
  margin-top: 73px;
  overflow: visible !important;
}
.aplayer-lrc {
  padding-top: 110px;
  height: 390px !important;
  margin-bottom: 50px !important;
  background-color: rgb(238, 227, 227);
}
.aplayer-pic {
  position: absolute !important;
  opacity: 0.59;
  top: 0px !important;
  width: 100% !important;
  left: 0 !important;
  height: 59% !important;
  filter: 10px !important;
}

.nolrc {
  position: absolute;
  bottom: 130px;
  color: rgba(31, 29, 29, 0.507);
  left: 50%;
  transform: translateX(-50%);
}
</style>