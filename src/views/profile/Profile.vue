<template>
  <div>
    <scroll class="content">
      <ul v-show="isShow" @click="liClick">别点，没写</ul>
      <ul v-show="!isShow">我都说别点我急了手机电脑我全砸了别人一说我急了我好像就真的恼羞成怒了仿佛他看穿了在网络背后的我这种感觉我很不舒服被看穿了被看的死死的我不想再故作坚强了玩心态我输的死死的一切都是冰冷的恨意,一想到这我就手脚冰凉遍体生寒后背发凉宛若人间地狱的恶魔,气的我蹲在地下车库哭了三小时,仿佛处在真空中窒息两分钟,忍不住哭了,是真的一下子就涌出来了,很委屈很不知所措很无力很愤怒!我不发疯我说什么？你以为我像你们一样都读过书?都上过学？都知道字怎么打？我从小自闭症，现在一句完整的话都说不完，看到大家都能打字，我也羡慕，所以只能发疯大家说过的话，证明我也会说话，连发疯你都要有意见？你不如把我杀了</ul>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: "Profile",
    data(){
      return {
        isShow:{
          type: Boolean,
          default: true
        }
      }
    },
    methods:{
      liClick(){
        this.isShow = false;
      }
    },
    components: {
      Scroll
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
</style>
