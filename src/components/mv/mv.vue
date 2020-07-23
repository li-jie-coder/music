<template>
  <div class="mv">
    <!--mv区-->
    <video :src="mvurl" autoplay controls width="100%"></video>

    <!--mv介绍区-->
    <div class="detail">
      <div class="title">{{detail.desc}}</div>
      <div class="detail_body">
        <div class="playcount">{{detail.playCount|money}}</div>
        <div class="artistname">{{detail.name}}</div>
        <div class="mvname">{{detail.artistName}}</div>
        <div class="publistime">{{detail.publishTime}}</div>
      </div>
      <div class="icon">
        <van-tabbar class="icons">
          <van-tabbar-item name="home" icon="good-job-o">{{mvinfo.likedCount}}</van-tabbar-item>
          <van-tabbar-item name="search" icon="star-o">{{mvinfo.shareCount}}</van-tabbar-item>
          <van-tabbar-item name="friends" icon="chat-o">{{mvinfo.commentCount}}</van-tabbar-item>
          <van-tabbar-item name="setting" icon="down">下载</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>

    <!--评论区-->
    <h6>评论区</h6>
    <div class="comments" v-for="(item, index) in comments" :key="index">
      <div class="pic">
        <img :src="item.user.avatarUrl" alt />
      </div>
      <div class="contents">
        <div class="nickname">{{item.user.nickname}}</div>
        <div class="time">{{item.time|time}}</div>
        <div class="content">{{item.content}}</div>
        <div class="icon">
          <span v-if="item.likedCount!=0">{{item.likedCount}}</span>
          <van-icon name="good-job-o" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mv",
  data() {
    return {
      id: this.$route.params.id,
      mvurl: "",
      comments: "",
      detail: "",
      mvinfo: ""
    };
  },
  filters: {
    money: function(num) {
      num = String(num);
      // console.log(num);
      var a = num.substring(0, num.length - 4);
      var b = num.substr(num.length - 4, 1);
      return a + "." + b + "万次观看";
    },
    time: function(time) {
      var data = new Date(time);
      var y = data.getFullYear();
      var m = data.getMonth() + 1;
      var d = data.getDate();
      return m + "月" + d + "日";
    }
  },
  created() {
    this.getmvurl();
    this.getcomments();
    this.getdetail();
    this.getmvinfo();
  },
  methods: {
    getmvurl() {
      this.axios.get("/mv/url?id=" + this.id).then(data => {
        // console.log(data.data.data);
        this.mvurl = data.data.data.url;
      });
    },
    getcomments() {
      this.axios.get("/comment/mv?id=" + this.id).then(data => {
        // console.log(data.data.comments);
        this.comments = data.data.comments;
      });
    },
    getdetail() {
      this.axios.get("/mv/detail?mvid=" + this.id).then(data => {
        // console.log(data.data.data);
        this.detail = data.data.data;
      });
    },
    getmvinfo() {
      this.axios.get("/mv/detail/info?mvid=" + this.id).then(data => {
        // console.log(data.data);
        this.mvinfo = data.data;
      });
    }
  }
};
</script>

<style scoped>
.detail {
  height: 180px;
  width: 100%;
}

.detail .title {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 700;
  width: 100%;
  height: 50px;
  padding: 5px;
}

.detail .detail_body {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  padding: 16px 0;
  font-size: 12px;
}
.detail .detail_body div:nth-child(n-1) {
  border-radius: 12px;
  padding: 0.5px;
  background-color: #fcf9f9;
}
.playcount {
  letter-spacing: 0.4px;
  font-size: 13px;
  color: #ccc;
}
.detail .icon {
  position: relative;
  width: 100%;
  height: 80px;
}
.icons {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.van-tabbar-item__text {
  color: rgb(240, 230, 230);
}
h6 {
  text-align: left;
}
.comments {
  border-bottom: 1px solid rgb(228, 226, 226);
  display: flex;
  margin: 5px;
}
.comments .pic {
  margin-right: 10px;
  flex: 1;
}
.comments .pic img {
  width: 100%;
  border-radius: 50%;
}

.comments .contents {
  position: relative;
  font-size: 14px;
  text-align: left;
  flex: 9;
  margin-bottom: 10px;
  overflow: hidden;
}
.nickname {
  font-size: 14px;
  color: rgb(139, 139, 139);
}
.time {
  font-size: 8px;
  color: rgb(139, 139, 139);
  margin-bottom: 5px;
}
.icon {
  position: absolute;
  top: 2px;
  right: 6px;
  color: rgb(161, 161, 161);
  font-size: 15px;
}
.icon span {
  position: absolute;
  display: inline-block;
  top: 3px;
  right: 16px;
  font-size: 8px;
}
</style>