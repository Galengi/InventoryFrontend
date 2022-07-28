import { ProductModel } from "./product";

export interface ShoppingList{
    id?: number;
    idProduct: number;
    idCompany: number;
    idTag?:number;
    productRequest?:ProductModel
    amount:number;
}

export class ShoppingLst{
    id?: number;
    idProduct: number;
    idCompany: number;
    idTag?:number;
    productRequest?:ProductModel
    amount:number;
    constructor(public shopList: ShoppingList){
        this.idProduct = shopList.idProduct;
        this.idCompany = shopList.idCompany;
        this.amount = shopList.amount;
        }
}