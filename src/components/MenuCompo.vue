<template>
  <div id="menuPage" @addCart='sendCart'>
    <h1>Menu</h1>
    <div id="filter">
      Filter section : JAY PART
      <!-- 
      1. Search : if search any words, the product which include the words will be shown
      2. Filter : coffee, non-coffee, 
        you can use radio box, or select, whatever you want
      3. orderby : order by alphabet, price -->
      <p>Search
        <input type="text">
      </p>
    </div>
    <main>
      <div id="menu" v-for="(prod,idx) in products" :key='idx'>
        <img :src='require(`../img/${prod.img}`)'  @click='menucart(idx)'/>
        <div id="pcontain" >
          <p @click='menucart(idx)'><span>{{prod.pname}}</span><span>${{ prod.price }}</span></p>
          <p><i class="fa-regular fa-heart" @click='liked(idx,$event)'></i></p>
          </div>
      </div>
    </main>
      <menu-modal v-show="modalshow" :menuinfo='cartProds' @close='closemodal'></menu-modal>
  </div>
</template>
<script>
  import MenuModal from '@/Modal/MenuModal.vue'
  import prodObj from "../res/product.json"
  
  const products = prodObj

   export default {
  components: { MenuModal },
    name: 'MenuCompo',
    props: {
    },
    data(){
      return{
        products,
        cartProds:{},
        modalshow:false
      }
    },
    methods:{
      menucart(idx){
        this.cartProds = this.products[idx]
        this.modalshow = true
      },
      closemodal(){
        this.modalshow = false
      },
      sendCart(value){
        this.$emit("addcart",value)
      },
      liked(idx,e){
        switch (e.target.className) {
          case "fa-solid fa-heart":
            e.target.className="fa-regular fa-heart"
            break;
            
          case "fa-regular fa-heart":
            e.target.className="fa-solid fa-heart"
            this.$emit("liked",this.products[idx])
          break;
        }
      }
    }

}
</script>
<style lang='scss' scoped>
*{
  margin:0;
  padding: 0;
}
#filter{
  border: 1px solid #000;
}
#menuPage{
  height: 100%;
  background-color: $LIGHT_BEIGE;
  padding: 5vh;
  display: flex;
  flex-direction: column;
  row-gap: 5vh;
}

main{
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 10vh;
  row-gap: 12vh;
}
#menu{
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1vh;
  img{
  width: 200px;
  }
  #pcontain{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }
  p{
    color: $NAVY;
    display: flex;
    flex-direction: column;
    row-gap: 1vh;
  }
  span{
    color: $NAVY;
  }
}
#menu:hover{
  cursor: pointer;
  img{
    box-shadow: 2px 2px 4px $DARK_BEIGE;
  }
}
</style>