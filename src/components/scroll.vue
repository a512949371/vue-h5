<template lang="html">
  <div class="yo-scroll"
  ref="yoscroll"
  :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
  @touchstart="touchStart($event)"
  @touchmove="touchMove($event)"
  @touchend="touchEnd($event)"
  @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
    <section ref="inner" class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <header class="pull-refresh">
        <slot name="pull-refresh">
           <span class="down-tip">下拉更新</span>
           <span class="up-tip">松开更新</span>
           <span class="refresh-tip">更新中…</span>
        </slot>
      </header>
      <slot></slot>
      <footer class="load-more" v-show="moreshow">
        <slot name="load-more">
          <span>加载中……</span>
        </slot>
      </footer>
    </section>
  </div>
</template>

<script>
let Scroll= {
  props: {
    offset: {
      type: Number,
      default: 40
    },
    enableInfinite: {
      type: Boolean,
      default: true
    },
    enableRefresh: {
      type: Boolean,
      default: true
    },
    onRefresh: {
      type: Function,
      default: undefined,
      required: false
    },
    onInfinite: {
      type: Function,
      default: undefined,
      require: false
    },
  },
  data() {
    return {
      top: 0,
      state: 0,
      startx:0,      
      starty: 0,
      endx:0,      
      endy:0,
      touching: false,
      infiniteLoading: false,
      scrollheight:'',
      moreshow:false
    }
  },
  methods: {
    touchStart(e) {
    	this.scrollheight=this.$refs.inner.offsetHeight-this.$refs.yoscroll.offsetHeight-24
    	this.startx = e.targetTouches[0].pageX
      this.starty = e.targetTouches[0].pageY
      this.startScroll = this.$refs.yoscroll.scrollTop || 0
      this.touching = true
			console.log("document",this.scrollheight)      
    },
    touchMove(e) {
    	console.log("startScroll",this.startScroll)
    	this.endy =e.targetTouches[0].pageY
      if (!this.enableRefresh || !this.touching) {
        return
      }
      if(this.$refs.yoscroll.scrollTop==0){
	      let diff = e.targetTouches[0].pageY - this.starty
	      if (diff > 0) e.preventDefault()
	      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)      	
      }
      if(this.startScroll>this.scrollheight){
      	this.moreshow=true
      	let diff = this.starty -e.targetTouches[0].pageY 
	      if (diff > 0) e.preventDefault()
	      this.top = -Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
      }

      if (this.state === 2) { // in refreshing
        return
      }
      if (this.top >= this.offset) {
        this.state = 1
      } else {
        this.state = 0
      }
    },
    touchEnd(e) {
    	if (!this.enableRefresh) return
      this.touching = false
      this.moreshow=false
    	if(this.endy-this.starty>0){

    	}else{
    	}
      
      if (this.state === 2) { // in refreshing
        this.state = 2
        this.top = this.offset
        return
      }
      if (this.top >= this.offset) { // do refresh
        this.refresh()
      } else { // cancel refresh
        this.state = 0
        this.top = 0
      }
      console.log("2",this.state)
    },
    refresh() {
      this.state = 2
      this.top = this.offset
      this.onRefresh(this.refreshDone)
    },
    refreshDone() {
      this.state = 0
      this.top = 0
    },

    infinite() {
      this.infiniteLoading = true
      this.onInfinite(this.infiniteDone)
    },

    infiniteDone() {
      this.infiniteLoading = false
    },

    onScroll(e) {
      if (!this.enableInfinite || this.infiniteLoading) {
        return
      }
      let outerHeight = this.$el.clientHeight
      let innerHeight = this.$el.querySelector('.inner').clientHeight
      let scrollTop = this.$el.scrollTop
      let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0
      let infiniteHeight = this.$el.querySelector('.load-more').clientHeight
      let bottom = innerHeight - outerHeight - scrollTop - ptrHeight
      if (bottom < infiniteHeight) this.infinite()
    }
  }
}
export default Scroll
</script>
<style>
.yo-scroll {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.yo-scroll .inner {
  position: absolute;
  top: -20px;
  width: 100%;
  transition-duration: 300ms;
}
.yo-scroll .pull-refresh {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.yo-scroll.touch .inner {
  transition-duration: 0ms;
}
.yo-scroll.down .down-tip {
  display: block;
}
.yo-scroll.up .up-tip {
  display: block;
}
.yo-scroll.refresh .refresh-tip {
  display: block;
}
.yo-scroll .down-tip,
.yo-scroll .refresh-tip,
.yo-scroll .up-tip {
  display: none;
}
.yo-scroll .load-more {
	position: absolute;
	bottom: -20px;
	left: 0;
	right: 0;
	padding-bottom: 10px;
	text-align: center;
  align-items: center;
  justify-content: center;
}  
</style>