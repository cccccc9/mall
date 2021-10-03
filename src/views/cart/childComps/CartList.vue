<template>
  <div class="cart-list">
    <scroll class="contents" ref="scr">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"> 
      </cart-list-item>
    </scroll>
  </div>
</template>
 
<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem.vue'

  import {mapGetters} from 'vuex';

  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem
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
    },
    methods:{},
    activated(){
      this.$refs.scr.refresh()
    }
  }
</script>
 
<style scoped>
  .cart-list{
    height: calc(100% - 44px);
  }

  .contents{
    height: 100%;
    overflow: hidden;
  }
</style>