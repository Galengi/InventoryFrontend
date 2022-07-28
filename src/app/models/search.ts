import { Company } from "./company";
import { Product, ProductModel } from "./product";
import { Tag } from "./tag";

export interface Search {
    name: string;
    products: Product[];
    companies: Company[];
    tags: Tag[];
}

export class SearchModel{
    name: string;
    lstProducts: ProductModel[];
    lstCompanies: Company[];
    lstTags: Tag[];


    constructor(
      public search: Search,
      public lstProds: ProductModel[]
    ) {
        this.name= search.name
        this.lstProducts = lstProds;
        this.lstCompanies = search.companies;
        this.lstTags = search.tags;
     }
}