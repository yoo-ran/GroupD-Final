class Product{
    constructor(id,pname,price,img,amount=1,shots,size,sweetener,toppings){
        this.id = id
        this.pname = pname
        this.price = price
        this.img = img
        this.amount = amount
        this.shots = shots
        this.size = size
        this.sweetener =sweetener
        this.toppings = toppings
    }
}
export default Product