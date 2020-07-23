<template>
  <div class="container" :style="backurl">
    <div class="login">
      <div class="txtbox">
        <label>电话：</label>
        <input v-model="phone" type="text" placeholder="请输入电话号码" />
      </div>
      <div class="txtbox">
        <label>密码：</label>
        <input v-model="password" type="password" placeholder="请输入密码" />
      </div>
      <van-button @click="getuserid()" type="default" size="large">登陆</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      phone: "",
      password: "",
      id: "",
      msg: "",
      backurl: {
        backgroundImage: "url('./static/timg (1).jpg')",
        backgroundSize: "100% 700px"
      }
    };
  },
  created() {
    if (localStorage.userid) {
      this.$router.replace("/my/" + localStorage.userid);
    }
  },
  methods: {
    getuserid() {
      localStorage.clear();
      console.log(this.id);
      this.axios
        .post("/login/cellphone", {
          phone: this.phone,
          password: this.password
        })
        .then(data => {
          console.log(data);
          console.log(this.phone);
          if (data.data.account) {
            this.id = data.data.account.id;
            localStorage.userid = this.id;
            // console.log(data.data.account.id);
            // console.log(this.id);
            console.log(localStorage.userid);
            this.$router.replace("/my/" + localStorage.userid);
          } else {
            console.log(data.data.msg);
            this.msg = data.data.msg;
          }
        })
        .catch(data => {
          console.log(data);
        });
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 700px;
}
.txtbox {
  height: 44px;
  width: 100%;
  font-size: 16px;
  padding: 10px 16px;
  border-bottom: 1px solid #f7f5f5;
}
.txtbox label {
  color: white;
  float: left;
}
.txtbox input {
  border: 0;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
}
.submit {
  width: 80%;
  background-color: rgb(62, 192, 243);
  border: 0;
}
.login {
  width: 100%;
  left: 0;
  bottom: 160px;
  position: absolute;
}
.van-button {
  margin-top: 30px;
  height: 35px;
  border-radius: 30px;
  width: 80%;
}
</style>