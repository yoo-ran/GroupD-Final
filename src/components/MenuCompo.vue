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
      <div id="menu" v-for="(prod,idx) in filteredProducts" :key='idx'>
        <img :src='require(`../img/${prod.img}`)'  @click='menucart(idx)'/>
        <div id="pcontain" >
          <p @click='menucart(idx)'><span>{{prod.pname}}</span><span>${{ prod.price }}</span></p>
          <p><i class="fa-regular fa-heart" @click='liked(idx,$event)'></i></p>
          </div>
      </div>
    </main>
      <menu-modal v-show="modalshow" :menuinfo='cartProds' @close='closemodal' @addCart="sendCart"></menu-modal>
  </div>
</template>
<script>
  import MenuModal from "../Modal/MenuModal.vue"
  import prodObj from "../res/product.json"
  import $ from "jquery"
  
  const products = prodObj;
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
        localLike:null,

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
    },
    mounted(){
      this.localLike = JSON.parse(localStorage.getItem("likedProd"))
      if(this.localLike!=undefined){
        this.localLike.forEach(obj => {
        $("i").eq(obj.id).addClass("fa-solid fa-heart")
      });
    }
    },
    computed:{
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
#filter {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  margin-bottom: 8px;
  border: 1px solid #000;
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

</style>