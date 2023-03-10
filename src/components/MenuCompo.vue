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

      <div id="filter">
  <p>Search:
    <input type="text" v-model="searchTerm">
  </p>
  <p>
    Filter:
    <label>
      <input type="radio" v-model="filterType" value="all" />
      All
    </label>
    <label>
      <input type="radio" v-model="filterType" value="coffee" />
      Coffee
    </label>
    <label>
      <input type="radio" v-model="filterType" value="noncoffee" />
      Non-coffee
    </label>
  </p>
  <p>Order by:
    <select v-model="orderBy">
      <option value="name">Name</option>
      <option value="price">Price</option>
    </select>
  </p>
</div>
      
    </div>
    <main>
      <div id="menu" v-for="(prod,idx) in filteredProducts" :key='idx' @click='menucart(idx)'>
        <img :src='require(`../img/${prod.img}`)'/>
        <p>{{prod.pname}}</p>
        <span>${{ prod.price }}</span>
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
        modalshow:false,

        searchTerm: '',
        filterType: 'all',
        orderBy: 'name'
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
      }
    },
    computed: {
      filteredProducts() {
        let products = this.products.filter(prod => {
          return prod.pname.toLowerCase().includes(this.searchTerm.toLowerCase());
        });

        if (this.filterType === 'coffee') {
          products = products.filter(prod => {
            return prod.type === 'coffee';
          });
        } else if (this.filterType === 'noncoffee') {
          products = products.filter(prod => {
            return prod.type !== 'coffee';
          });
        }

        if (this.orderBy === 'name') {
          products.sort((a, b) => a.pname.localeCompare(b.pname));
        } else if (this.orderBy === 'price') {
          products.sort((a, b) => a.price - b.price);
        }

        return products;
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