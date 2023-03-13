<template>
  <div id="bg">
    <div id="modal">
      <div id="info">
      <h1>Menu</h1>
      <img id="img" v-if="menuinfo.img" :src="require(`../img/${menuinfo.img}`)" />
      <h2>{{ menuinfo.pname }}</h2>
      <h2>${{ menuinfo.price }}</h2>
      </div>
      <div id="form">
        <label for="quantity">Quantity:</label>
        <input id="quantity" type="number" v-model="quantity" min="1" />
        <label for="milk-type">Milk Type:</label>
        <select id="milk-type" v-model="milkType">
          <option value="whole">Whole</option>
          <option value="skim">Skim</option>
          <option value="soy">Soy</option>
          <option value="almond">Almond</option>
        </select>
        <label for="sweetener">Sweetener:</label>
        <select id="sweetener" v-model="sweetener">
          <option value="none">None</option>
          <option value="sugar">Sugar</option>
          <option value="honey">Honey</option>
          <option value="stevia">Stevia</option>
        </select>
        <label for="shots">Number of Shots:</label>
        <input id="shots" type="number" v-model="shots" min="1" max="4"/>
        <label for="toppings">Toppings:</label>
        <select id="toppings" v-model="toppings">
          <option value="none">None</option>
          <option value="ChocolateFoam">Chocolate Foam</option>
          <option value="CaramelDrizzel">Caramel Drizzel</option>
          <option value="ChocolateSprinkles">Chocolate Sprinkles</option>
          <option value="WhippedCream">Whipped Cream</option>
          <option value="Cinnamon Powder">Cinnamon Powder</option>
        </select>
        <label for="size">Size:</label>
        <select id="size" v-model="size">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <div>
          <p> Calories: {{totalCalories}}</p>
        </div>
        <button id="close" @click='close'>X</button>
        <button id='cart' @click='addCart'>Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MenuModal",
    // props: ["menuinfo"],
    props:{menuinfo: Object}
    ,
    // whatch:{
    //     quantity: function(){
    //       this.calculateCalories();
    //     },
    //     milkType: function(){
    //       this.calculateCalories();
    //     },
    //     sweetener: function(){
    //       this.calculateCalories();
    //     },
    //     shots: function(){
    //       this.calculateCalories();
    //     },
    //     toppings: function(){
    //       this.calculateCalories();
    //     }
    // },
    data() {
      return {
        quantity: 1,
        milkType: "whole",
        sweetener: "none",
        shots: 1,
        toppings: "none",
        size: "medium",
        msg:"hola"
      };
    },
    computed: {
  totalCalories() {
    let quantity= this.quantity;
    let sweetenerCalories = 0;
    switch (this.sweetener) {
      case 'none':
        sweetenerCalories = 0;
        break;
      case 'sugar':
        sweetenerCalories = 16;
        break;
      case 'honey':
        sweetenerCalories = 21;
        break;
      case 'stevia':
        sweetenerCalories = 0;
        break;
      default:
        sweetenerCalories = 0;
    }
    let milkCalories = (this.milkType === 'whole') ? 150 : ((this.milkType === 'skim') ? 90 : 120);
    if (this.size === 'medium') {
      milkCalories *= 1.2;
    } else if (this.size === 'large') {
      milkCalories *= 1.4;
    }
    let shotCalories = this.shots * 5;
    let toppingsCalories = 0;
    switch (this.toppings) {
      case 'none':
        toppingsCalories = 0;
        break;
      case 'ChocolateFoam':
        toppingsCalories = 60;
        break;
      case 'CaramelDrizzel':
        toppingsCalories = 40;
        break;
      case 'ChocolateSprinkles':
        toppingsCalories = 70;
        break;
      case 'WhippedCream':
        toppingsCalories = 120;
        break;
      case 'Cinnamon Powder':
        toppingsCalories = 10;
        break;
      default:
        toppingsCalories = 0;
    }
    let totalCalories = (sweetenerCalories + milkCalories + shotCalories + toppingsCalories)*quantity;
    return totalCalories;
  }
},

    methods: {
      close() {
        this.$emit("close", false);
      },
      addCart(){
        let prod = {
          ...this.menuinfo,
          quantity: this.quantity,
          milkType: this.milkType,
          sweetener: this.sweetener,
          shots: this.shots,
          toppings: this.toppings,
          size: this.size,
        };
        console.log(prod);
        this.$emit("addCart", prod);
      },
      // calculateCalories(){
      //   //calculate the calories based on the input values
      //   let quantity= this.quantity;
      //   let milkCalories = (this.milkType ==='whole')? 150 : ((this.milkType==='skim')? 90:120);
      //   if (this.size === 'medium') {
      //     milkCalories *= 1.2;
      //   } else if (this.size === 'large') {
      //     milkCalories *= 1.4;
      //   }
      //   let sweetenerCalories = 0;
      //     switch (this.sweetener) {
      //     case 'none':
      //       sweetenerCalories = 0;
      //       break;
      //     case 'sugar':
      //       sweetenerCalories = 16;
      //       break;
      //     case 'honey':
      //       sweetenerCalories = 21;
      //       break;
      //     case 'stevia':
      //       sweetenerCalories = 0;
      //       break;
      //   }
      //   let shotCalories = this.shots * 5;
      //   let toppingsCalories = 0;
      //     switch (this.toppings) {
      //       case 'none':
      //         toppingsCalories = 0;
      //         break;
      //       case 'ChocolateFoam':
      //         toppingsCalories = 60;
      //         break;
      //       case 'CaramelDrizzel':
      //         toppingsCalories = 40;
      //         break;
      //       case 'ChocolateSprinkles':
      //         toppingsCalories = 70;
      //         break;
      //       case 'WhippedCream':
      //         toppingsCalories = 120;
      //         break;
      //       case 'Cinnamon Powder':
      //         toppingsCalories = 10;
      //         break;
      //       default:
      //         toppingsCalories = 0;
      //     }
      //     let totalCalories = (sweetenerCalories + milkCalories + shotCalories + toppingsCalories)*quantity;
      //     console.log(totalCalories);
      //     //update the calories data property with tthe calculated value
      //     this.calories = totalCalories;

      // }
    }
    // mounted(){
    //   console.log(this.menuinfo.img);
    // }
  };
</script>
<style lang="scss" scoped>
  h1,h2{
    color: $NAVY;
  }
  #bg {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba($color: #000000, $alpha: 0.4);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #modal {
    position: relative;
    background-color: $LIGHT_BEIGE;
    width: 80%;
    max-width: 800px;
    height: 600px;
    border-radius: 20px;
    box-shadow: 4px 4px 8px 2px #444;
    display: flex;
    justify-content: space-between;
  }
  #info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1vh;
    width: 55%;
  }
  #img{
    border-radius: 10px;
    width: 50vh;
  }
  #close{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    font-weight: bold;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: $NAVY;
  }
  #form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0.5vh;
    padding: 4px 0;
    overflow: auto;
    width: 45%;
  }
  #form label {
    margin-bottom: 5px;
    color: $NAVY;
  }
  #form input[type="number"],
  #form select,
  #form input[type="text"] {
    width: 40%;
    margin-right: 10px;
    border: 1px solid $NAVY;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    font-family: inherit;
    color: $NAVY;
    background-color: white;
    &:focus {
      outline: none;
      border-color: lightblue;
    }
  }
  #cart {
    background-color: $NAVY;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: darken($NAVY, 10%);
    }
  }
</style>