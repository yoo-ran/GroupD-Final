<template>
  <div id="menuPage" @addCart='sendCart'>
    <h1>Menu</h1>
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


#filter {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  margin-bottom: 8px;
}

#menuPage {
  height: 100%;
  background-color: $DARK_BLUE;
  padding: 5vh;
  display: flex;
  flex-direction: column;
  row-gap: 5vh;
}

main {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 10vh;
  row-gap: 12vh;
}

#menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1vh;

  img {
    width: 200px;
    height: auto;
    object-fit: contain;
  }

  p {
    color: $LIGHT_BEIGE;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
  }

  span {
    color: $LIGHT_BEIGE;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 5px;
  }
}

#menu:hover {
  cursor: pointer;
  img {
    box-shadow: 2px 2px 4px $DARK_BEIGE;
  }
}

input[type="text"] {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #000;
  width: 200px;
}

label {
  margin-left: 10px;
}

select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #000;
  width: 200px;
}

@media only screen and (max-width: 768px) {
  main {
    column-gap: 5vh;
    row-gap: 8vh;
  }

  #menu {
    img {
      width: 150px;
    }

    p {
      font-size: 1.2rem;
      margin-top: 5px;
    }

    span {
      font-size: 1.2rem;
      margin-top: 3px;
    }
  }
}
p{
  color: white;
  font-weight: 600;
  font-size: larger;
}

</style>