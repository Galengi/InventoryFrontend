import { Product } from "./product";

export interface Company{
    id: number;
    name: string;
    priority:number;
    productCompanies:any[];
    products:Product[];
    shoppingLists:Product[];
    productModels: Product[];
}
export interface CompanyProduct{
    id: number;
    name: string;
    price:number;
}