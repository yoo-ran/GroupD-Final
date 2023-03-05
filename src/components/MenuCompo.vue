<template>
  <div id="menuPage">
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
        <img :src='require(`../img/${prod.img}`)'/>
        <p>{{prod.pname}}</p>
        <span>${{ prod.price }}</span>
      </div>
    </main>
  </div>
</template>
<script>
  import prodObj from "../res/product.json"
  const products = prodObj

   export default {
    name: 'MenuCompo',
    props: {
    },
    data(){
      return{
        products
      }
    }

}
</script>
<style lang='scss'>
*{
  margin:0;
  padding: 0;
}
#filter{
  border: 1px solid #000;
}
#menuPage{
  height: 100%;
  background-color: $DARK_BLUE;
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
  p{
    color: $LIGHT_BEIGE;
  }
  span{
    color:$LIGHT_BEIGE;
  }
}
#menu:hover{
  cursor: pointer;
  img{
    box-shadow: 2px 2px 4px $DARK_BEIGE;
  }
}
</style>