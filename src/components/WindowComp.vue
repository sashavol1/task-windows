<template>
  <div class="box" :class="{active: active || isDrag}" :style="{ left: posLeft + 'px', top: posTop + 'px', width: width + 'px', height: height + 'px' }">
    <div class="box-header" @mousedown="onGrab">
      <div class="box-header__text">{{ title }}</div>
      <div class="box-header__close" @click="removeBlock"></div>
    </div>
    <div class="box-body" @click="onActive" :class="{loading: isLoad}">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, harum dignissimos beatae obcaecat.</p>
    </div>

    <div class="box-border-right" @mousedown="onResize('width')" @click="onResizeStop"></div>
    <div class="box-border-bottom" @mousedown="onResize('height')" @click="onResizeStop"></div>
  </div>
</template>

<script>
export default {
  name: 'WindowComp',
  props: {
    handlerRemove: Function,
    handlerSave: Function,
    title: String,
    block: Object,
    startX: Number,
    startY: Number,
    startWidth: Number,
    startHeight: Number
  },
  data () {
    return {
      box: this.block,
      isDrag: false,
      isLoad: false,
      isResize: false,
      resizeSide: '',
      active: false,
      posLeft: this.startX,
      posTop: this.startY,
      width: this.startWidth,
      height: this.startHeight
    }
  },
  methods: {
    onActive () {
      this.active = !this.active;
      if (this.active) {
        location.hash = this.box.id;
        let _this = this;
        this.isLoad = !this.isLoad;
        setTimeout(() => {
          _this.isLoad = !_this.isLoad;
        }, 500)
      } else {        
        location.hash = '';
      }
    },
    onDrag (event) {
      let originalStyles = window.getComputedStyle(this.$el);
      this.posLeft = parseInt(originalStyles.left) + event.movementX;
      this.posTop = parseInt(originalStyles.top) + event.movementY;
    },
    onLetGo (event) {
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.onLetGo);
      this.isDrag = false;
      if (event.target.className != 'box-header__close') {
        this.saveElements();
      }
    },
    onGrab () {
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.onLetGo);
      this.isDrag = true;
    },
    saveElements () {
      this.box.startX = this.posLeft;
      this.box.startY = this.posTop;
      this.box.startWidth = this.width;
      this.box.startHeight = this.height;
      this.handlerSave(this.box);
    },
    onResizeStop () {
      this.isResize = false;
      this.saveElements();
    },
    onResize (side) {
      document.addEventListener('mousemove', this.onResizeStart);
      this.isResize = true;
      this.resizeSide = side;
    },
    onResizeStart (event) {
      if (this.isResize) {

        if (this.resizeSide === 'width') {
          this.width = this.$el.offsetWidth + event.movementX;
        } else if (this.resizeSide === 'height') {
          this.height = this.$el.offsetHeight + event.movementY;
        } else {
          throw new Error('resize fail')
        }
      }
    },
    removeBlock() {
      this.handlerRemove(this.box.id);
    }
  }, 
  mounted () {

    // if (localStorage.posLeft) {
    //   this.posLeft = localStorage.posLeft;
    // }
    // if (localStorage.posTop) {
    //   this.posTop = localStorage.posTop;
    // }
    // if (localStorage.width) {
    //   this.width = localStorage.width;
    // }
    // if (localStorage.height) {
    //   this.height = localStorage.height;
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @mainBorder: #35363d;
  @mainBackground: #23232a;

  .box {
    border: 1px solid @mainBorder;
    background-color: @mainBackground;
    margin: 20px;
    position: fixed;
    left: 0;
    top: 0;
    opacity: .7;
    user-select: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &.active {
      opacity: 1;
      z-index: 10;
    }

    &-header {
      border-bottom: 1px solid @mainBorder;
      padding: 5px 0;
      position: relative;
      cursor: move;
      height: 30px;
      &__text {
        color: #fff;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 13px;
        user-select: none;
      }
      &__close {
        position: absolute;
        left: 3px;
        top: 50%;
        margin-top: -7px;
        cursor: pointer;
        height: 14px;
        width: 14px;
        background-color: #fff;
        cursor: pointer;
        &:after {
          content: '';
          width: 10px;
          height: 2px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top: -1px;
          margin-left: -5px;
          background-color: @mainBorder;
        }
      }
    }

    &-body {
      font-size: 12px;
      color: #fff;
      overflow: hidden;
      height: 100%;
      &.loading {
        background: url(https://c.sbl.su/img/spin50.gif) no-repeat;
        background-size: 30px;
        background-position: center;
      }
    }

    &-border {
      &-right {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 2px;
        background-color: transparent;
        cursor: col-resize;
        z-index: 2;
      }
      &-bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: transparent;
        cursor: row-resize;
        z-index: 2;
      }
    }
  }
</style>
