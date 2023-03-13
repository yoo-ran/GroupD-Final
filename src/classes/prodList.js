import Product from "./Prod.js"

class ProductList {
    pList = new Map()

    shop(pObj){
        let product = new Product(pObj.id,pObj.pname,pObj.price,pObj.img)
        this.pList.set(pObj.id,product)
    }
}
export default ProductList