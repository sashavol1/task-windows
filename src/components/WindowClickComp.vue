<template>
  <div class="box" :class="{active: dragging}" :style="{ left: posLeft + 'px', top: posTop + 'px' }" @mouseleave="leaveDrag">
    <div class="box-header" @click="doDrag" @mousemove="moveDrag">
      <div class="box-header__text">{{ title }}</div>
      <div class="box-header__close" @click="removeBlock"></div>
    </div>
    <!-- <div class="box-body">Lorem ipsum dolor, sit amet, consectetur adipisicing elit. Odit quasi iusto asperiores inventore natus vitae ipsum sapiente distinctio perspiciatis.</div> -->
    <div class="box-body">
      posLeft {{ posLeft }} px   {{ posTop }} px <br>
      dragClickX {{ dragClickX }} px   {{ dragClickY }} px <br>
      mouseX {{ mouseX }} px   {{ mouseY }} px <br>
    </div>

    <div class="box-border-right"></div>
    <div class="box-border-bottom"></div>
  </div>
</template>

<script>
export default {
  name: 'WindowComp',
  props: {
    handlerRemove: Function,
    title: String,
    data: Object,
    startX: Number,
    startY: Number
  },
  data () {
    return {      
      active: false,
      dragging: false,
      posLeft: this.startX,
      posTop: this.startY,
      mouseX: 0,
      mouseY: 0,
      dragClickX: 0,
      dragClickY: 0
    }
  },
  methods: {
    leaveDrag() {
      this.dragging = false;
    },
    doDrag(event) {
      console.log(this.$el.offsetWidth, this.$el.offsetHeight);
      this.dragging = !this.dragging;
      // console.log(this.$el.getBoundingClientRect());
      if (this.dragging) {
        console.log(event);
        this.dragClickX = event.x - this.$el.offsetWidth;
        this.dragClickY = event.y - this.$el.offsetHeight;
      }
    },
    moveDrag() {
      if (this.dragging) {
      // console.log(event.pageX, event.pageY);
      // console.log(this.dragClickX, this.dragClickY);
      // console.log(event.pageX - this.dragClickX, event.pageY - this.dragClickY);
        this.posLeft = event.pageX - this.dragClickX;
        this.posTop = event.pageY - this.dragClickY;
      }
    },
    removeBlock() {
      this.handlerRemove(this.data.id);
    }
  },
  mounted() {
    document.addEventListener('mouseup', this.stopDrag);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @mainBorder: #35363d;
  @mainBackground: #23232a;

  .box {
    width: 300px;
    height: 100px;
    border: 1px solid @mainBorder;
    background-color: @mainBackground;
    margin: 20px;
    position: fixed;
    left: 0;
    top: 0;
    opacity: .7;
    &.active {
      opacity: 1;
      z-index: 10;
    }

    &-header {
      border-bottom: 1px solid @mainBorder;
      padding: 5px 0;
      position: relative;
      cursor: move;
      user-select: none;
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
      padding: 10px;
    }

    &-border {
      &-right {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 2px;
        background-color: red;
        cursor: move;
      }
      &-bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: red;
        cursor: move;
      }
    }
  }
</style>
