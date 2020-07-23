<template>
  <div class="appcontainer">
    <!-- 搜索框    -->
    <van-search
      ref="mysearch"
      v-model="keywords"
      @click="onFocus"
      class="searchbar"
      clear
      @blur="onBlur()"
      show-action
      shape="round"
      background="#cccccc"
      placeholder="请输入搜索关键词"
    />
    <!-- 内容区域 -->
    <transition>
      <router-view class="content" :keywords="this.keywords" ref="mychild" @senddata="getkeywords"></router-view>
    </transition>
    <!-- tabbar区 -->
    <van-tabbar route class="tabbar" active-color="red">
      <van-tabbar-item replace to="/home">
        <span>发现</span>
        <template #icon="props">
          <img class="logal" :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/communication" icon="friends">MV</van-tabbar-item>
      <van-tabbar-item replace to="/login" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      active: 1,
      // route: this.$router.params.path,
      icon: {
        active: "../../../static/finded.jpg",
        inactive: "../../../static/find.jpg"
      },
      falg: false,
      keywords: ""
    };
  },
  methods: {
    onFocus() {
      if (this.$router.path != "/search") {
        this.$router.replace("/search");
        this.keywords = this.$refs.mysearch.value;
      }
    },
    onBlur() {
      if (this.$route.path != "/search") {
        this.keywords = "";
        // console.log(this.$route.path);
      }
    },
    getkeywords(key) {
      this.keywords = key;
      // console.log(this.$route);
      if (this.$route.path != "/search") {
        this.keywords = key;
      }
    }
  }
};
</script>

<style scoped>
.appcontainer {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  color: #2c3e50;
  overflow-x: hidden;
}
.searchbar {
  position: fixed;
  width: 100%;
  max-width: 375px;
  z-index: 999;
}

.content {
  margin-top: 54px;
  margin-bottom: 54px;
  max-width: 414px;
  width: 100%;
  padding: 2%;
}

.tabbar {
  z-index: 999;
  max-width: 375px;
  width: 100%;
}
.van-tabbar {
  left: 50%;
  transform: translateX(-50%);
}
.v-enter {
  opacity: 0;
  transform: translatex(100px);
}
.v-leave-to {
  position: absolute;
  opacity: 0;
  transform: translatex(-100px);
}

.v-enter-active {
  transition: all ease 0.4s;
}
.van-search__action {
  color: black;
}
.playing {
  width: 100%;
}
.logal {
  height: 29px;
  width: 32px;
}
</style>
