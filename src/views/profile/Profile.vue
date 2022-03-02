<template>
  <div>
    <scroll class="content">
      <div class="profile-head">
        <div class="profile-pic">
          <img src="~assets/img/category/0.jpg" alt="">
        </div>
        <div class="profile-zone">
          <span>个人空间 &gt</span>
        </div>
      </div>
      <div class="profile-bottom">
        <div class="bottom-item" v-for="item in selections">
          <span class="item-left">{{item}}</span>
          <span style="float:right;margin-right:30px;color:black">&gt</span>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: "Profile",
    components: {
      Scroll
    },
    data() {
      return {
        selections: ['支付', '收货地址', '我的客服', '设置', '退出登录']
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .content {
    height: 100vh;
    background-color: white;
    font-size: 25px;
    overflow: hidden;
  }

  .profile-head {
    height: 20vh;
    display: table;
    /* border-radius: 5px 5px 5px 5px; */
    width: 100%;
    margin-top: 20px;
    background: rgb(240, 240, 240);
  }

  .profile-pic {
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    width: 200px;
  }

  .profile-pic img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }

  .profile-zone {
    color: grey;
    text-align: right;
    padding-right: 60px;
    font-size: 23px;
    display: table-cell;
    vertical-align: middle;
  }

  .profile-bottom {
    height: 60vh;
    background: rgb(240, 240, 240);
    margin-top: 20px;
  }

  .bottom-item {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid grey;
  }

  .bottom-item .item-left {
    font-size: 18px;
    margin-left: 20px;
    color: black;
  }
</style>