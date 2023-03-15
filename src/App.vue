<template>
  <div id="app">
    <header>
      <router-link to="/home" style='textDecoration:none'><h1><span>Mexi</span>Ko</h1></router-link> 
      <nav>
        <router-link to="/home"><a>Home</a></router-link> 
        <router-link to="/"><a>Menu</a></router-link> 
        <router-link to="/cart"><a>Cart</a></router-link>
        <router-link to="/login" @click="loginOut"><a>{{ loginFlag }}</a></router-link>
      </nav>
    </header>
    <router-view @logout='logoutHandle' @addcart='sendCart' @liked='likeHandle' @del="del" :editList='productList.pList' :liked='productList.pList' :cart='likeList.pList' :user='deUser' />
    <footer>
        <h1>
          <span>Mexi</span>Ko
          <p>© 2023 MexiKo, LLC.</p>
        </h1>
        <nav>
          <router-link to="/"><a>Menu</a></router-link> 
          <router-link to="/home"><a>Home</a></router-link> 
          <router-link to="/cart"><a>Cart</a></router-link> 
          <router-link to="/login"><a>Login</a></router-link>
        </nav>
        <ul>
          <li>(+1) 989-445-9102</li>
          <li>889 W Pender St #200</li>
          <li>mexiko@gmail.com</li>
        </ul>
    </footer>
  </div>
</template>

<script>
import $ from "jquery"
import ProductList from './classes/prodList'
import CryptoJS from "crypto-js"

export default {
  name: 'App',
  components:{
  },
  data(){
    return{
      loginFlag:"Login",
      sessionCart:null,
      cartList:[],
      productList : new ProductList(),
      eList:null,
      likeList:new ProductList(),
      key:"java",
      enUser:"",
      deUser:"",
      like:""
  
    }
  },
  methods:{
    logoutHandle(user){
      this.loginFlag = "Logout"
      console.log(user);
      this.enUser = CryptoJS.AES.encrypt(JSON.stringify(user),this.key).toString()
      sessionStorage.setItem("user",this.enUser)
    },
    loginOut(e){
      switch ($(e.target).text()) {
        case "Logout":
          this.loginFlag = "Login"
          this.$router.push({name:"loginpage"})
          break;

      }
    },
    sendCart(value){
      console.log(value);
      this.cartList.push(value)
      localStorage.setItem("cartProd",JSON.stringify(this.cartList))
    },
    likeHandle(lPobj){
      let get = JSON.parse(localStorage.getItem("likedProd"))
      for (const key in get) {
        this.likeList.shop(get[key])
        }
      this.likeList.shop(lPobj)//
      this.like = Object.fromEntries(this.likeList.pList)//
      localStorage.setItem("likedProd",JSON.stringify(this.like))//
    },
    del(idx){
      this.productList.del(idx)
      console.log(this.productList);
      this.productList.pList.forEach(obj => {
        this.cartList.push(obj)
      });
      localStorage.setItem("cartProd",JSON.stringify(this.cartList))
    }
  },
  mounted(){

    this.sessionCart = JSON.parse(localStorage.getItem("cartProd"))
    if(this.sessionCart!=undefined){
        this.sessionCart.forEach(cPobj => {
          this.productList.cart(cPobj)
        });
    }
    if(sessionStorage.getItem("user")!=null){
      this.deUser =  JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem("user"),this.key).toString(CryptoJS.enc.Utf8))
      if(this.deUser!=null){
        this.loginFlag="Logout"
      }
    }
    
  },
}
</script>

<style lang="scss" scoped>

header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5vh 10%;
  h1{
    color: $DARK_BEIGE;
    font-size: 50px;
    span{
      color: $DARK_BLUE;
    }
  }
  nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 5vh;
    font-size: 20px;
    a{
      color: $DARK_BLUE;
      text-decoration: none;
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    a:hover{
      color: $NAVY;
    }
    .vue-active-link{
      a {color: $NAVY;}
      text-decoration:underline;
    }
  }
}
footer{
  background-color:$LIGHT_BEIGE;
  height: 150px;
  display: flex;
  padding: 0 10%;
  justify-content: space-between;
  align-items: center;
  column-gap: 10vh;
  color: #888;
  
  h1{
    padding-bottom: 1vh;
    span{
      color: #666;
    }
    p{
      font-size: 14px;
      color: #999;
      font-weight: 100;
    }
  }
  li{
    list-style: none;
    font-weight: 100;
  }
  nav{
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5vh;
    a{
      color: #888;
      text-decoration: none;
    }
  }
}
</style>
