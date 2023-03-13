import Product from "./Prod.js"

class ProductList {
    pList = new Map()

    shop(pObj){
        let product = new Product(pObj.id,pObj.pname,pObj.price,pObj.img)
        this.pList.set(pObj.id,product)
    }
    cart(pObj){
        let product = new Product(pObj.id,pObj.pname,pObj.price,pObj.img,pObj.quantity,pObj.shots,pObj.size,pObj.sweetener,pObj.toppings)
        this.pList.set(pObj.id,product)
    }
    del(idx){
        this.pList.delete(idx)
    }
}
export default ProductList