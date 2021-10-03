<template>
  <div id='detail'>
    <detail-nav-bar class="detail-nav" @titleIndex="itemClick" ref="detailNav"/>
    <scroll class="contents" ref="scroll" :probe-type=3 @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="itemParams"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"></goods-list>
    </scroll>
    <back-top class="back" @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addCart"/>
    <toast :message="message" :show="show" />
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
  import DetailBottomBar from './childComps/DetailBottomBar.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'
  import Toast from 'components/common/toast/Toast.vue'


  import Scroll from 'components/common/scroll/Scroll.vue'

  import {debounce} from 'common/utils/debounce.js';

  import {itemListenerMixin} from 'common/utils/mixin.js'
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail.js'
  import {mapActions} from 'vuex'

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
        itemListner:null,
        themeTopY:[],
        isShowBackTop: false,
        getThemeTopY:null,
        currentIndex: 0,
        message: "",
        show: false
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
      DetailBottomBar,
      BackTop,
      GoodsList,
      Toast
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
        this.$nextTick(()=>{
          // this.themeTopY.splice(0);
          // this.themeTopY.push(0);
          // this.themeTopY.push(this.$refs.params.$el.offsetTop);
          // this.themeTopY.push(this.$refs.comment.$el.offsetTop);
          // this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
          // console.log(this.themeTopY)
        })
      })
      // console.log(this.topImages)
      getRecommend().then(res=>{
        this.recommend.push(...res.data.list);
      })

      this.getThemeTopY = debounce(()=>{
        this.themeTopY.splice(0);
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopY)  
      },100)
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
      ...mapActions({
        add: 'addCart'
      }),
      imageLoad(){
        // console.log(this)

        this.$refs.scroll.refresh()
        // this.$children[1].refresh()
        this.getThemeTopY()
      },
      itemClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index],0);
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position){
        this.isShowBackTop = (-position.y) > 1000
        const y = -position.y;
        for(let i = 0;i<this.themeTopY.length-1;i++){
          if(y>this.themeTopY[i]){
            if(y<this.themeTopY[i+1]){
              //属于第i个区间
              // console.log(i)
              this.$refs.detailNav.currentIndex = i;
            }
            else{
              //属于第i+1个区间
              // console.log(i+1)
              this.$refs.detailNav.currentIndex = i+1;
            }
          }
        }
      },
      addCart(){
        // console.log('kk');
        const prodct = {};
        prodct.image = this.topImages[0];
        prodct.title = this.goods.title;
        prodct.desc = this.goods.desc;
        prodct.price = this.goods.realPrice;
        prodct.iid = this.iid;
        prodct.count = null;
        // console.log(prodct)
        // this.$store.cartList.push(prodct)
        this.add(prodct).then((res) => {
          console.log(res);
          // (this.show = true),
          //   (this.message = res),
          this.show = true;
          this.message = res;
            setTimeout(() => {
              this.show = false;
              this.message = "";
            }, 900);
          // this.$toast.display(res, 20000);
          // console.log(this.$toast);
        });
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
  .contents{
    height: calc(100% - 44px);
    overflow: hidden;
  }
  /* .back{
    z-index: 10;
  } */
</style>