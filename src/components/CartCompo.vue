<template>
  <div id="cart">
      <h1>cart</h1> 
      <h1 v-for="(cart,idx) in addcart" :key="idx">{{ cart }}</h1>
  </div>
</template>
<script>
export default {
  name: 'CartCompo',
  props: ["addcart"],
  data(){
    return{
    }
  }
}
</script>
<style>
/* #cart{} */
</style>