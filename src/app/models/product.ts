import { Company, CompanyProduct } from "./company";
import { ShoppingList } from "./shopping-list";
import { TagProduct } from "./tag";
import { TypeUnit } from "./type-unit";

export interface Product{
    id: number;
    name: string;
    currentAmount:number;
    minAmount:number;
    image?:string;
    price:number;
    defaultCompany:number;
    required:number;
    expiration?:string;
    productAmount:number;
    unitPrice:number;
    typeAmount:number;
    productCompanies:CompanyProduct[];
    productTags:TagProduct[];
}

export class ProductModel{
    id: number;
    name: string;
    currentAmount:number;
    minAmount:number;
    image?:string;
    price:number;
    defaultCompany:string;
    required:number;
    productAmount:number;
    unitPrice:number;
    typeAmount:string;
    productCompanies:CompanyProduct[];
    productTags:TagProduct[];


    constructor(
      public product: Product,
      public lstTyp: TypeUnit[],
      public lstComp: Company[]
    ) {
        this.id = this.product.id;
        this.name = this.product.name;
        this.currentAmount = this.product.currentAmount;
        this.minAmount = this.product.minAmount;
        this.image = this.product.image;
        this.price = this.product.price;
        this.defaultCompany = this.lstComp.find(e=> e.id===this.product.defaultCompany)?.name as string;
        this.required = this.product.required;
        this.productAmount = this.product.productAmount;
        this.unitPrice = this.product.unitPrice;
        this.typeAmount = this.lstTyp.find(e=> e.id===this.product.typeAmount)?.name as string;
        this.productCompanies = this.product.productCompanies  as CompanyProduct[];
        this.productTags = this.product.productTags as TagProduct[];
     }
}

export interface MyProductModel{
  name: string;
  priority: number;
  lstModels: ProductModel[];
}
