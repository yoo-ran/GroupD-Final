<template>
  <div id="home">
    <h1>Home</h1>
    <h1>{{ msg }}</h1>
    <!-- <h2>{{ liked }}</h2> -->
    <h1>Favorite Item</h1>
    <main>
      <div  v-for="(p,idx) in liked" :key='idx'>
          <img :src='require(`../img/${p.img}`)'/>
            <p><span>{{p.pname}}</span><span>${{ p.price }}</span></p>
      </div>
    </main>
  </div>
</template>
<script>
   export default {
    name: 'HomeCompo',
    props: ["msg"],
    data(){
      return{
        liked:null
      }
    },
    mounted(){
      let localLiked = JSON.parse(localStorage.getItem("likedProd"))
      this.liked = localLiked
    }
  }
</script>
<style lang='scss' scoped>
#home{
  
}
main{
  background-color: $LIGHT_BEIGE;
  padding: 5vh 0;
  display: flex;
  justify-content: space-evenly;
  img{
    width: 200px
  }
  p{
    display: flex;
    justify-content: space-between;
    color:$NAVY;
  }
}

</style>