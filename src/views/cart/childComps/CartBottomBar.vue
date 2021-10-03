<template>
  <div class="bottom-bar" v-show="true">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="total">合计：{{ totalPrice }}</div>
    <div class="calculate">去计算：{{ checkLength }}</div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton,
    },
    data() {
      return {
        isShow: true,
      };
    },
    computed: {
      totalPrice() {
        return (
          "￥" +
          this.$store.state.cartList
            .filter((item) => {
              return item.checked;
            })
            .reduce((preValue, item) => {
              return preValue + item.price * item.count;
            }, 0)
        );
      },
      checkLength() {
        return this.$store.state.cartList.filter((item) => item.checked).length;
      },
      isSelectAll() {
        //   return !this.$store.state.cartList.filter((item) => !item.checked).length;
        if (this.$store.state.cartList.length === 0) {
          return false;
        } else {
          return !this.$store.state.cartList.find((item) => !item.checked);
        }
      },
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.$store.state.cartList.forEach((item) => (item.checked = false));
        } else {
          // this.isSelectAll = true;
          this.$store.state.cartList.forEach((item) => (item.checked = true));
        }
      },
    },
    activated() {
      //   购物车没有商品时，该组件不显示
      if (this.$store.state.cartList.length === 0) {
        return (this.isShow = false);
      }
      this.isShow = true;
    },
  };
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    z-index: 11;
    display: flex;
  }
  .check-content {
    display: flex;
    align-items: center;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin: 0 10px 0 5px;
  }
  .total {
    margin-left: 20px;
  }
  .calculate {
    position: absolute;
    right: 0;
    background-color: var(--color-tint);
    padding: 0 10px;
    color: #fff;
  }
</style>