<template>
  <div id="home">
    <h1>Home</h1>
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
   export default {
    name: 'HomeCompo',
    props: ["msg"],
    data(){
      return{
      }
    }
  }
</script>
<style>
#home{
  
}
</style>