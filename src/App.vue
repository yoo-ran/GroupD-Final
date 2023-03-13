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
      <h1>{{ msg }}</h1>
    </header>
    <router-view @logout='logoutHandle' @addcart='sendCart'/>
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
export default {
  name: 'App',
  components:{
  },
  data(){
    return{
      loginFlag:"Login",
      cartProd:{id:0,pname:"",price:0,img:""},
      cartList:[],
      msg:"hello"
    }
  },
  methods:{
    logoutHandle(){
      this.loginFlag = "Logout"
    },
    loginOut(e){
      switch ($(e.target).text()) {
        case "Logout":
          this.loginFlag = "Login"
          this.$router.push({name:"loginpage"})
          break;
      
        default:
          break;
      }
    },
    sendCart(value){
      this.msg = value
    }
  }
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
