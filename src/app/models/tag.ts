import { Product, ProductModel } from "./product";

export interface Tag{
    id: number;
    name: string;
    priority:number;
    productTags:any[];
    productModels: Product[];
}
export class TagProduct{
    id: number;
    name: string;
    constructor(
        public newId:number,
        public newName:string
    ) {
        this.id = newId;
        this.name = newName;
    }
}