<template>
    <div id="bg">
      <div id="modal">
        <h1>menu</h1>
        <!-- <img :src='require(`../img/${menuinfo.img}`)'> -->
        <!-- <img :src='`../img/${menuinfo.img}`'> -->
        <h2>{{ menuinfo.img }}</h2>
        <h2>{{ menuinfo.pname }}</h2>
        <h2>${{ menuinfo.price }}</h2>
        <div>
          <button id="close" @click='close'>X</button>
          <button id='cart' @click='addCart'>Add to cart</button>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
    name: 'MenuModal',
    props: ["menuinfo"],
    data(){
        return{
        }
    },
    methods:{
      close(){
        this.$emit('close',false)
      },
      addCart(){
        let prod = this.menuinfo
        this.$emit('addCart',prod)
      }
    }
    }
</script>
<style lang='scss' scoped>
 #bg{
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.4);
  width: 100%;
  height: 2125px;
  display: flex;
  justify-content: center;
 }
  #modal{
    background-color:$LIGHT_BEIGE;
    width: 80%;
    height: 700px;
    margin-top: 100px;
    border-radius: 20px;
    box-shadow: 4px 4px 8px 2px #444;
    button{
      background-color: transparent;
      color: $NAVY;
      font-size: 20px;
      font-weight: 700;
      border: none;
      cursor: pointer;
    }
  }
</style>