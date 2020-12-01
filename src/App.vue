<template>
  <div id="app">
    <div class="button-return" @click="returnFromTrash">+ Return tile to trading desk {{ trash.length }}</div>
    <WindowComp  
    v-for="(block, index) in blocks" :key="block.id" 
    :handlerRemove="handlerRemove" 
    :handlerSave="handlerSave" 
    :handlerResortPriority="handlerResortPriority" 
    :block="block" 
    :sizeBlocks="blocks.length" 
    :index="index" 
    :startX="block.startX" 
    :startY="block.startY" 
    :startWidth="block.startWidth" 
    :startHeight="block.startHeight" 
    :title="block.name" />
  </div>
</template>

<script>
import WindowComp from './components/WindowComp.vue'
import { defaultBoxWidth, defaultBoxHeight } from './Utils'

export default {
  name: 'App',
  components: {
    WindowComp
  },
  data () {
    return {
      posX: '',
      posY: '',
      blocks: [
        { id: 1, name: 'Tile #1', isPriority: false, startX: 10, startY: 10, startWidth: 300, startHeight: 100},
        { id: 2, name: 'Tile #2', isPriority: false, startX: 20, startY: 20, startWidth: 300, startHeight: 100},
        { id: 3, name: 'Tile #3', isPriority: false, startX: 30, startY: 30, startWidth: 300, startHeight: 100},
        { id: 4, name: 'Tile #4', isPriority: false, startX: 40, startY: 40, startWidth: 300, startHeight: 100},
        { id: 5, name: 'Tile #5', isPriority: false, startX: 50, startY: 50, startWidth: 300, startHeight: 100}
      ],
      trash: []
    }
  },
  methods: {
    handlerSave(box) {
      let tmp = this.blocks.filter(b => b.id != box.id);
      let tmpTrash = this.trash.filter(b => b.id != box.id);

      if (tmp.length > 0) {
        localStorage.blocks = JSON.stringify([...tmp, box]);        
      }

      if (tmpTrash.length > 0) {
        localStorage.trash = JSON.stringify([...tmpTrash, box]);
      }
    },
    handlerRemove(id) {
      let currentEl = this.blocks.filter(b => b.id == id)[0];
      if (currentEl) {
        currentEl.startWidth = defaultBoxWidth;
        currentEl.startHeight = defaultBoxHeight;
        currentEl.startX = window.innerWidth / 2 - (defaultBoxWidth / 2);
        currentEl.startY = window.innerHeight  / 2 - (defaultBoxHeight / 2);
        currentEl.isPriority = false;
        
        this.trash = [currentEl, ...this.trash];
        this.blocks = this.blocks.filter(b => b.id != id);

        // save after remove
        localStorage.blocks = JSON.stringify(this.blocks);
        localStorage.trash = JSON.stringify(this.trash);
      }
    },
    handlerResortPriority (box) {
      // resort items
      let leftElements = this.blocks.filter(b => b.id != box.id);
      this.blocks = [box, ...leftElements];
      
      // save
      localStorage.blocks = JSON.stringify(this.blocks);
    },
    returnFromTrash () {
      if (this.trash.length > 0) {
        this.blocks = [...this.blocks, ...this.trash];
        localStorage.blocks = JSON.stringify(this.blocks);

        // clear trash
        this.trash = [];
        localStorage.removeItem('trash');
      }
    }
  },
  created () {
    if (localStorage.blocks) {
      this.blocks = JSON.parse(localStorage.blocks);

      // Кастыль, чтобы появилось поле у всех, после сохранения
      if (typeof this.blocks[0].isPriority !== "boolean") {
        localStorage.removeItem('blocks');
        localStorage.removeItem('trash');
      }
    }
    if (localStorage.trash) {
      this.trash = JSON.parse(localStorage.trash);
    }
  }
}
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #35363d;
  width: 100%;
  height: 100%;
  position: absolute;
}
html, body {
  margin: 0;
}
.button-return {
  position: absolute;
  text-align: center;
  left: 50%;
  margin-left: -200px;
  bottom: 100px;
  border: 1px solid #333;
  padding: 50px 100px;
  &:hover {
    border-color: orange;
    color: orange;
    cursor: pointer;
  }
}
</style>
