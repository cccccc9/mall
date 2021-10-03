<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{cartLength}}）</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import CartBottomBar from './childComps/CartBottomBar.vue'
  import NavBar from 'components/common/navbar/NavBar.vue'
  import CartList from './childComps/CartList.vue'

  import { mapGetters} from 'vuex';

  export default {
    name: "Cart",
    components:{
      NavBar ,
      CartList,
      CartBottomBar
    },
    computed:{
      ...mapGetters([
        'cartLength',
        'cartList'
      ])
      // ...mapGetters({
      //   length:'cartLength'
      // },{
      //   list:'cartList'
      // })
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
    /* font-weight: 700; */
    text-align: center;
    z-index: 10;
  }
  .cart{
    height: 84.5vh;
  }
</style>
