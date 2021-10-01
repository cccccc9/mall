<template>
  <div id='detail'>
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="itemParams"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommend"></goods-list>
    </scroll>
  </div>
</template>
 
<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'


  import Scroll from 'components/common/scroll/Scroll.vue'

  // import {debounce} from 'common/utils/debounce.js';

  import {itemListenerMixin} from 'common/utils/mixin.js'
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail.js'

  export default {
    name: "detail",
    mixins:[itemListenerMixin],
    data () {
      return {
        iid:null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo:{},
        itemParams:{},
        commentInfo:{},
        recommend:[],
        itemListner:null
      }
    },
    components: {
      Scroll, 
      DetailNavBar, 
      DetailSwiper, 
      DetailBaseInfo, 
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList
    },
    created(){
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        // this.topImage = res.result.itemInfo.topImages
        this.topImages.push(...res.result.itemInfo.topImages)
        // console.log(res)
        const data = res.result
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.itemParams = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        }
      })
      // console.log(this.topImages)
      getRecommend().then(res=>{
        this.recommend.push(...res.data.list);
      })
    },
    mounted(){
      // const refresh = debounce(this.$refs.scroll.refresh, 500)
      // this.itemListner = () =>{
      //   refresh()
      // }
      // this.$bus.$on('imageLoaded',this.itemListner)
    },
    destroyed(){
      this.$bus.$off('imageLoaded', this.itemListner)
    },
    // deactivated(){
    //   this.topImages.splice(0,this.topImages.length)//没有keepalive后会初始化数据
    // },
    // activated(){
    //   this.iid = this.$route.params.iid//activated不要请求数据
    //   getDetail(this.iid).then(res => {
    //     // console.log(res)
    //     this.topImage.push(...res.result.itemInfo.topImages)
    //   })
    // },
    methods:{
      // test(){
      //   console.log("haha")
      // }
      imageLoad(){
        console.log(this)

        this.$refs.scroll.refresh()
        // this.$children[1].refresh()
      }
    }
  }
</script>
 
<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>