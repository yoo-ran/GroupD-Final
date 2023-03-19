<template>
  <div id="home">
    <div id="user">
      <h1>Welcome "{{user.fname}}"</h1>
      <p></p>
      <h5>Username: <span>{{ user.fname }} {{ user.lname }}</span></h5>
      <h5>Email : <span>{{ user.email }}</span></h5>
      <h5>Birth of Date: <span>{{ user.bod }}</span></h5>
    </div>
    <main> 
        <h2>Favorite Item</h2>
      <section>
        <div id="fav"  v-for="(p,idx) in liked" :key='idx'>
            <img :src='require(`../img/${p.img}`)'/>
            <p><span>{{p.pname}}</span><span>${{ p.price }}</span></p>
            <p><i class="fa-solid fa-heart" @click='dislike(p.id,$event)'></i></p>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
    import $ from "jquery"
   export default {
    name: 'HomeCompo',
    props: ["user"],
    data(){
      return{
        liked:""
      }
    },
    methods:{
      dislike(id,e){
        $(e.target).parent().parent().remove()
        e.target.className = "fa-regular fa-heart"
        let like = JSON.parse(localStorage.getItem("likedProd"))
        for (const key in like) {
            if(key==id){
              delete like[key];
            }
        }
        localStorage.setItem("likedProd",JSON.stringify(like))
      }
    },
    mounted(){
      let localLiked = JSON.parse(localStorage.getItem("likedProd"))
      this.liked = localLiked
      this.user 
    }
  }
</script>
<style lang='scss' scoped>
#home{
  background-color: $LIGHT_BEIGE;
  padding: 4vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
form{
  width: 20%;
}
#user{
  // border: 2px dotted #999;
  background-color: rgba($color: #fff, $alpha: 0.6);
  width: 50%;
  padding: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    border: 1px dotted #999;
    width: 70%;
  }

}
h1,h2,h5{
  color: $NAVY;
  span{
    font-weight: 300;
  }
}
i{
  cursor: pointer;
}
main{
  background-color: $LIGHT_BEIGE;
  padding: 5vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1vh;
  img{
    width: 200px
  }
  p{
    display: flex;
    justify-content: space-between;
    color:$NAVY;
  }
}
section{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 5vh;
}

</style>