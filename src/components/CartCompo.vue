<template>
    <div id="cart">
        <h1>Shopping Cart</h1> 
        <div class="table-responsive" >
          <table class="table table-striped
          table-hover	
          table-borderless
          table-primary
          align-middle">
            <thead class="table-light">
              <tr>
                <th>#ID</th>
                <th colspan="2">Product</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Total</th>
                <th>Customize</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr class="table-primary"  v-for="[idx,cart] in cart" :key="idx">
                  <td scope="row">{{ cart.id }}</td>
                  <td><img v-if="cart.img" :src="require(`../img/${cart.img}`)" alt=""></td>
                  <td>{{ cart.pname }}</td>
                  <td>${{ cart.price }}</td>
                  <td>{{ cart.amount }}</td>
                  <td>${{ cart.price * cart.amount }}</td>
                  <td>Size: {{ cart.size }} <br> Shots: {{ cart.shots }} <br> Sweetener: {{ cart.sweetener }} <br> Toppings: {{ cart.toppings }}</td>
                  <td><button @click='edit(idx)' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalId">Edit</button></td>
                  <td><button @click='del(idx)' class="btn btn-primary">Delete</button></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colspan="7">All Total:</th>
                  <th colspan="2">$ {{ alltotal() }}</th>
                </tr>
              </tfoot>
          </table>
        </div>        
        <!-- Modal Body -->
        <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
        <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">Menu Edit</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form @submit.prevent='save'>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="" class="form-label">Amount</label>
                  <input type="number"
                      class="form-control form-control-sm" v-model="eamount" aria-describedby="helpId">
                </div>
                <div class="mb-3">
                  <label class="form-label">Number of Shots:</label>
                  <input type="number"
                      class="form-control form-control-sm" v-model="eshots" aria-describedby="helpId" min="1" max="4">
                </div>
                <div class="mb-3">
                  <label class="form-label">Sweetener</label>
                  <select class="form-select form-select-lg" v-model="esweetener">
                    <option value="none" selected>None</option>
                    <option value="sugar">Sugar</option>
                    <option value="honey">Honey</option>
                    <option value="stevia">Stevia</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Toppings</label>
                  <select class="form-select form-select-lg" v-model="etoppings">
                    <option value="none" selected>None</option>
                    <option value="ChocolateFoam">Chocolate Foam</option>
                    <option value="CaramelDrizzel">Caramel Drizzel</option>
                    <option value="ChocolateSprinkles">Chocolate Sprinkles</option>
                    <option value="WhippedCream">Whipped Cream</option>
                    <option value="Cinnamon Powder">Cinnamon Powder</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Size</label>
                  <select class="form-select form-select-lg" v-model="esize">
                    <option value="small" selected>Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
<!-- 
        <label for="milk-type">Milk Type:</label>
        <select id="milk-type" v-model="milkType">
          <option value="whole">Whole</option>
          <option value="skim">Skim</option>
          <option value="soy">Soy</option>
          <option value="almond">Almond</option>
        </select -->
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
      
        
    </div>
</template>
<script>

 export default {
    name: 'CartCompo',
    props: ["cart","editList"],
    data(){
      return{
        editObj:null,
        eamount:1,
        eshots:1,
        esize:"medium",
        esweetener:"none",
        etoppings:"none",
        localArr:[],
      }
    },
    methods:{
      del(idx){
        this.$emit("del",idx)
      },
      edit(idx){
        console.log(this.cart.get(idx))
        this.editObj = this.cart.get(idx)
        this.editModal = true
        this.eamount=parseInt(this.editObj.amount)
        this.eshots=parseInt(this.editObj.shots)
        this.esize=this.editObj.size
        this.esweetener=this.editObj.sweetener
        this.etoppings=this.editObj.toppings
      },
      save(){
        this.editObj.amount = this.eamount
        this.editObj.shots = this.eshots
        this.editObj.size = this.esize
        this.editObj.sweetener = this.esweetener
        this.editObj.toppings = this.etoppings
        this.cart.forEach(cart => {
          if(cart.id==this.editObj.id){
            this.cart.set(this.editObj.id,this.editObj)
          }
          this.localArr.push(cart)
        });
        sessionStorage.setItem("cartProd",JSON.stringify(this.localArr))
      },
      alltotal(){
        let sum = 0
        this.cart.forEach(obj => {
          sum += obj.price * obj.amount
        });
        return sum
      }
    },  
    mounted(){
    }
  }
</script>
<style lang='scss' scoped>
  #cart{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 5vh;
    height: 390px;
    h1{
      color: $NAVY;
    }

  }
  .table-responsive{
    width: 80%;
    text-align: center;
    img{
      width: 100px;
    }
  }
  .table-light{
    color: $NAVY;
  }
  .table-primary{
    td:nth-child(7){
      text-align: left;
      width: 20%;
    }
  }
  .btn {
    background-color: $NAVY;
    border: 1px solid $NAVY;
  }
  .btn:hover{
    background-color: $DARK_BLUE;
  }
  tfoot{
    th{
      background-color: $LIGHT_BLUE;
      color: $NAVY;
      font-size: 20px;
    }
  }
</style>