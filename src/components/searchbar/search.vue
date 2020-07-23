<template>
  <div class="searchcmp">
    <!-- 轮播图单张 -->
    <div class="swipe" v-if="flag">
      <van-icon @click="flag=!flag" name="cross" size="10" color="#ccc" />
      <img :src="swipe" alt />
    </div>

    <!-- 热搜榜 -->
    <div class="hotsearch" v-if="!this.keywords" ref="son">
      <h5>热搜榜</h5>
      <div class="music_list">
        <div
          class="lists"
          v-for="(item, index) in hotmusic"
          :key="index"
          @click="senddata(item.searchWord)"
        >
          <div class="number">{{index-0+1}}</div>
          <div class="music">
            <router-link to="/search" tag="div">
              <h5>{{item.searchWord}}</h5>
              <img v-if="item.iconUrl" :src="item.iconUrl" alt />
            </router-link>
            <span>{{item.content}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索歌曲 -->
    <transition appear>
      <div class="searchmusic" v-if="this.keywords">
        <!-- 歌名 -->
        <div class="songs">
          <router-link
            class="name"
            v-for="(item, index) in songs"
            :key="index"
            @click="senddata()"
            :to="'/playing/'+item.id"
            tag="div"
          >
            <van-icon name="search" />
            {{item.name}}
          </router-link>
        </div>
        <!-- 作者 -->
        <!-- <div class="artists">
          <div class="name" v-for="(item, index) in artists" :key="index">
            <van-icon name="search" />
            {{item.name}}
          </div>
        </div>-->
        <!-- mv -->
        <!-- <div class="mvs">
          <div class="name" v-for="(item, index) in mvs" :key="index">
            <van-icon name="search" />
            {{item.name}}
          </div>
        </div>-->
        <!-- 主题曲 -->
        <!-- <div class="albums">
          <div class="name" v-for="(item, index) in mvs" :key="index">
            <van-icon name="search" />
            {{item.name}}
          </div>
        </div>-->
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "search",
  created() {
    this.getswipe();
    this.gethotmusic();
  },
  data() {
    return {
      swipe: "",
      flag: true,
      hotmusic: "",
      songs: "",
      artists: "",
      albums: "",
      mvs: ""
    };
  },
  watch: {
    keywords: {
      handler() {
        if (this.keywords != "") {
          this.axios
            .get("/search/suggest?type:'mobile'&keywords=" + this.keywords)
            .then(data => {
              console.log(data);
              this.albums = data.data.result.albums;
              this.songs = data.data.result.songs;
              this.mvs = data.data.result.mvs;
              this.artists = data.data.result.artists;
            });
        }
      }
    }
  },
  props: ["keywords"],
  methods: {
    getswipe() {
      this.axios.get("/banner?type=2").then(data => {
        // console.log(data.data.banners[0].pic );
        this.swipe = data.data.banners[0].pic;
      });
    },
    gethotmusic() {
      this.axios.get("/search/hot/detail").then(data => {
        // console.log(data.data.data);
        this.hotmusic = data.data.data;
      });
    },
    senddata(a) {
      this.$emit("senddata", a);
    }
  }
};
</script>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(-80%);
}

.v-enter-acitve,
.v-leave-active {
  translate: all 0.4s ease;
}
.searchcmp {
  width: 100%;
  height: 100%;
}
.swipe {
  width: 100%;
  position: relative;
}
.van-icon-cross {
  right: 8px;
  top: 4px;
  position: absolute;
}
.swipe img {
  width: 100%;
  height: 78px;
  border-radius: 11px;
}
.hotsearch {
  height: 100%;
}
.hotsearch h5 {
  text-align: left;
}

.hotsearch .music_list {
  width: 100%;
  height: 665px;
}

.hotsearch .music_list .lists {
  float: left;
  width: 45%;
  float: left;
  margin: 10px 5px;
  display: flex;
  text-align: left;
}

.hotsearch .music_list .lists h5 {
  float: left;
  font-size: 14px;
  font-weight: bolder;
  margin: 0;
  padding: 0;
}

.hotsearch .music_list .lists .number {
  text-align: center;
  padding: 15px;
  font-weight: bolder;
}
.number:nth-child() {
  color: red;
}
.hotsearch .music_list .lists .music {
  width: 90%;
}
.hotsearch .music_list .lists .music span {
  display: block;
  width: 95%;
  height: 12px;
  padding-top: 5px;
  font-size: 12px;
  line-height: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #6666;
}
.music div {
  height: 50%;
}
.music div h5 {
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  word-spacing: break-word;
  text-overflow: ellipsis;
}
.music div img {
  float: left;
  margin-left: 5px;
  margin-top: 2px;
  width: 26px;
  height: 15px;
}

.searchmusic {
  width: 100%;
  text-align: left;
}

.searchmusic .name {
  height: 41px;
  font-size: 15px;
  border-bottom: solid 1px #ccc;
  padding: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.searchresult {
  width: 100%;
  height: 100%;
}

.van-icon-search {
  vertical-align: middle;
}
</style>