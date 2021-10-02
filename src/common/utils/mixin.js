import {debounce} from './debounce.js';

export const itemListenerMixin = {
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemListner = () =>{
      refresh()
    }
    this.$bus.$on('imageLoaded',this.itemListner)
    // console.log("?")
  }
}