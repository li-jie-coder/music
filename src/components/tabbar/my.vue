<template>
  <div class="myhome" :style="mybgurl">
    <div class="box">
      <!--用户头像名字-->
      <div class="contents">
        <div class="user">
          <img :src="avaterpic" class="user_pic" />
          <input class="user_name" v-model="user.nickname" />
          <van-icon name="edit" size="20" @click="modifynickname" />
        </div>
        <!--社交区-->
        <div class="mommunicate">
          <van-tabbar route>
            <van-tabbar-item icon="envelop-o" :badge="follow">我的消息</van-tabbar-item>
            <van-tabbar-item icon="friends-o">我的好友</van-tabbar-item>
            <van-tabbar-item icon="home-o">个人主页</van-tabbar-item>
            <van-tabbar-item icon="star-o" size="40">收藏</van-tabbar-item>
          </van-tabbar>
        </div>

        <div class="selection">
          <!--创意作者中心-->
          <div class="idea">
            <div class="left">
              <van-icon name="bulb-o" size="20px" />
            </div>创作者中心
            <div class="right">
              <van-icon name="arrow" size="20px" />
            </div>
          </div>
          <!--音乐服务-->
          <div class="musicserve">
            <h6>音乐服务</h6>
            <div class="choice">
              <div class="icon">
                <van-icon name="coupon-o" />
              </div>
              <div class="section">
                演出
                <div class="littlearrow">
                  <van-icon name="arrow" size="20px" />
                </div>
              </div>
            </div>
            <div class="choice">
              <div class="icon">
                <van-icon name="shop-o" />
              </div>
              <div class="section">
                商场
                <div class="littlearrow">
                  <van-icon name="arrow" size="20px" />
                </div>
              </div>
            </div>
            <div class="choice">
              <div class="icon">
                <van-icon name="music-o" />
              </div>
              <div class="section">
                口袋彩铃
                <div class="littlearrow">
                  <van-icon name="arrow" size="20px" />
                </div>
              </div>
            </div>
            <div class="last_choice">
              <div class="icon">
                <van-icon name="credit-pay" />
              </div>
              <div class="section">
                在线听歌免流量
                <div class="littlearrow">
                  <van-icon name="arrow" size="20px" />
                </div>
              </div>
            </div>
          </div>
          <!--小工具-->
          <div class="musicserve">
            <h6>小工具</h6>
            <div class="choice">
              <div class="icon">
                <van-icon name="coupon-o" />
              </div>
              <div class="section">
                设置
                <div class="littlearrow">
                  <van-icon name="arrow" size="20px" />
                </div>
              </div>
            </div>
            <div class="choice">
              <div class="icon">
                <van-icon name="shop-o" />
              </div>
              <div class="section">
                夜间模式
                <div class="switchbutton">
                  <van-switch
                    v-model="checked"
                    active-color="red"
                    inactive-color="#fff"
                    size="20px"
                  />
                </div>
              </div>
            </div>
            <div class="choice">
              <div class="icon">
                <van-icon name="music-o" />
              </div>
              <div class="section">
                口袋彩铃
                <div class="littlearrow">
                  <van-icon name="arrow" size="20px" />
                </div>
              </div>
            </div>
            <div class="last_choice">
              <div class="icon">
                <van-icon name="credit-pay" />
              </div>
              <div class="section">
                在线听歌免流量
                <div class="littlearrow">
                  <van-icon name="arrow" size="20px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--退出登录-->
        <div class="logout" @click="logout()">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      active: 0,
      mybgurl: "",
      phone: "",
      password: "",
      id: this.$route.params.id,
      avaterpic: "",
      backgroundurl: "",
      user: "",
      checked: false,
      follow: ""
    };
  },
  created() {
    this.getuserid();
    if (!localStorage.userid) {
      this.$router.replace("/login");
    }
  },
  methods: {
    getuserid() {
      this.axios.get("/user/detail?uid=" + this.id).then(data => {
        // console.log(data.data);
        // console.log(data.data.profile.backgroundUrl);
        this.user = data.data.profile;
        this.backgroundurl = data.data.profile.backgroundUrl;
        this.avaterpic = data.data.profile.avatarUrl;
        this.follow = data.data.profile.follows;
        this.mybgurl = {
          backgroundImage: "url(" + this.backgroundurl + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 200px"
        };
      });
    },
    logout() {
      // this.axios.get("/logout").then(data => {
      //   console.log(data);
      // });
      localStorage.clear();
      this.$router.replace("/login");
    },
    modifynickname() {
      this.axios
        .post("/activate/init/profile?nickname=" + this.user.nickname)
        .then(data => {
          console.log(this.user.nickname);
        });
    }
  }
};
</script>

<style scoped>
.myhome {
  position: relative;
  height: 784px;
}
.content {
  padding: 0;
}
.contents {
  margin-top: -28px;
  padding: 75px 5px;
  width: 100%;
  height: 600px;
  border-radius: 25px;
  background: white;
}
.box {
  padding-top: 200px;
}
.user {
  position: absolute;
  top: 200px;
  height: 30px;
  text-align: left;
  width: 100%;
}
.user input {
  border: 0;
  position: absolute;
  left: 37px;
  font-size: 14px;
  height: 30px;
  width: 110px;
  overflow: hidden;
}
.van-icon-edit {
  position: absolute;
  top: 10px;
  right: 12px;
}
.user_pic {
  width: 30px;
  border-radius: 50%;
}
.mommunicate {
  position: relative;
  height: 50px;
}
.van-tabbar {
  height: 50px !important;
  position: absolute;
  left: 0;
  top: 0;
}
.idea {
  position: relative;
  width: 105%;
  margin-left: -2.5%;
  height: 50px;
  text-align: left;
  padding-left: 10%;
  line-height: 50px;
  border-top: 5px solid rgb(247, 245, 245);
}
.idea div {
  float: left;
}
.left {
  position: absolute;
  left: 7px;
  top: 3.5px;
}

.right {
  position: absolute;
  right: 7px;
  top: 3.5px;
}

.musicserve {
  width: 105%;
  margin-left: -2.5%;
  text-align: left;
  padding-left: 0%;
  border-top: 5px solid rgb(247, 245, 245);
}
h6 {
  margin: 0;
  height: 30px;
  line-height: 30px;
  padding-left: 3%;
  border-bottom: 1px solid rgb(236, 236, 236);
}
.choice,
.last_choice {
  display: flex;
  width: 100%;
  height: 40px;
}
.section {
  position: relative;
  font-size: 14px;
  color: black;
}
.last_choice .section {
  flex: 9;
  height: 40px;
  line-height: 40px;
}
.icon {
  flex: 1;
  line-height: 40px;
  height: 100%;
  padding-top: 2px;
  padding-left: 20px;
}
.choice .section {
  flex: 9;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgb(236, 236, 236);
}
.van-icon-arrow {
  color: #ccc;
}
.littlearrow {
  position: absolute;
  width: 20px;
  right: 8px;
  top: 5px;
}

.switchbutton {
  position: absolute;
  width: 30px;
  right: 22px;
  top: 5px;
}
.logout {
  height: 50px;
  line-height: 40px;
  width: 105%;
  margin-left: -2.5%;
  padding-left: 0%;
  text-align: center;
  border-top: 5px solid rgb(247, 245, 245);
  border-bottom: 5px solid rgb(247, 245, 245);
  color: red;
  font-weight: 300;
}
</style>