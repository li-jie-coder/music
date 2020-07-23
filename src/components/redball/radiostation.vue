<template>
  <div class="recommenddj">
    <!-- 推荐电台  -->
    <div class="djs_header">
      <h4>推荐电台</h4>
      <div class="change" @click="getdjprogram()">
        <van-icon name="replay" />&nbsp;&nbsp; 换一换
      </div>
    </div>
    <div class="djs">
      <div class="dj" v-for="(item, index) in djs" :key="index">
        <div class="dj_pic">
          <img :src="item.picUrl" alt />
          <div class="detail">{{item.name}}</div>
        </div>
        <div class="dj_detail">{{item.copywriter}}</div>
      </div>
    </div>
    <!-- 推荐节目 -->
    <div class="djs_header">
      <h4>推荐节目</h4>
      <div class="change" @click="getrecommend()">
        <van-icon name="replay" />&nbsp;&nbsp; 换一换
      </div>
    </div>
    <div class="djs">
      <div class="dj" v-for="(item, index) in recommends" :key="index">
        <div class="dj_pic">
          <img :src="item.coverUrl" alt />
          <div class="detail">{{item.name}}</div>
        </div>
        <div class="dj_detail">{{item.reason}}</div>
      </div>
    </div>
    <!-- 独家放送 -->
    <div class="djs_header">
      <h4>独家放送</h4>
      <div class="change" @click="getprivatecontent()">
        <van-icon name="replay" />&nbsp;&nbsp; 换一换
      </div>
    </div>
    <div class="djs">
      <div class="dj" v-for="(item, index) in pirvate" :key="index">
        <div class="dj_pic">
          <img :src="item.picUrl" alt />
          <div class="detail">{{item.name}}</div>
        </div>
        <div class="dj_detail">{{item.copywriter}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommenddj",
  created() {
    this.getdjprogram();
    this.getrecommend();
    this.getprivatecontent();
  },
  data() {
    return {
      djs: "",
      recommends: "",
      pirvate: ""
    };
  },
  methods: {
    getdjprogram() {
      this.axios.get("/personalized/djprogram").then(data => {
        // console.log(data.data.result);
        this.djs = this.getRandomArray(data.data.result, 3);
        // console.log(this.djs);
      });
    },
    getrecommend() {
      this.axios.get("/program/recommend").then(data => {
        // console.log(data.data.programs);
        this.recommends = this.getRandomArray(data.data.programs, 3);
      });
    },
    getprivatecontent() {
      this.axios.get("/personalized/privatecontent").then(data => {
        // console.log(data.data.result);
        this.pirvate = this.getRandomArray(data.data.result, 3);
      });
    },
    // 随机获得 n个 数组中的数据
    getRandomArray(arr, num) {
      //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
      var temp_array = new Array();
      for (var index in arr) {
        temp_array.push(arr[index]);
      }
      //取出的数值项,保存在此数组
      var return_array = new Array();
      for (var i = 0; i < num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length > 0) {
          //在数组中产生一个随机索引
          var arrIndex = Math.floor(Math.random() * temp_array.length);
          //将此随机索引的对应的数组元素值复制出来
          return_array[i] = temp_array[arrIndex];
          //然后删掉此索引的数组元素,这时候temp_array变为新的数组
          temp_array.splice(arrIndex, 1);
        } else {
          //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
          break;
        }
      }
      return return_array;
    }
  }
};
</script>

<style scoped>
.recommenddj {
  margin-top: 90px;
  width: 100%;
}

.djs {
  width: 100%;
  height: 180px;
  display: flex;
}
.djs img {
  min-height: 80px;
  width: 100%;
}
h4 {
  float: left;
  margin: 5px 0;
  margin-left: 5px;
  text-align: left;
}
.change {
  border-radius: 14px;
  border: 1px solid #ccc;
  float: right;
  width: 80px;
  margin: 5px 0;
  margin-left: 5px;
  font-size: 14px;
  position: relative;
}
.van-icon-replay {
  position: absolute;
  left: 6px;
  top: 3px;
}

.dj {
  flex: 1;
  margin: 5px;
  height: 146px;
  overflow: hidden;
}
.dj_pic {
  position: relative;
}
.detail {
  position: absolute;
  left: 0;
  bottom: 4px;
  width: 100%;
  height: 17px;
  line-height: 17px;
  font-size: 12px;
  overflow: hidden;
  color: white;
  background-color: rgba(204, 204, 204, 0.425);
}
.dj_detail {
  font-size: 12px;
}
</style>