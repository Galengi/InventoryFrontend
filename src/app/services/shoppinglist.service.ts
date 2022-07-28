import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "../models/product";


@Injectable({
    providedIn: 'root'
})

export class ShoppinglistService {
    products: Product[] = [];

    private listSubject = new Subject<Product[]>();
    private totalSubject = new Subject<number>();
    private quantitySubject = new Subject<number>();

    get totalActions$(): Observable<number> {
        return this.totalSubject.asObservable();
    }
    get quantityActions$(): Observable<number> {
        return this.quantitySubject.asObservable();
    }
    get listActions$(): Observable<Product[]> {
        return this.listSubject.asObservable();
    }

    updateList(product:Product):void {
        this.addToList(product);
        this.quantityProducts();
        this.calcTotal();
    }

    private quantityProducts():void{
        const quantity = this.products.reduce((acc,prod) => acc+=prod.currentAmount,0);
        this.quantitySubject.next(quantity);
    }

    private addToList(product:Product): void{
        const isProductInList = this.products.find(({id}) => id ===product.id)

        if (isProductInList) {
            isProductInList.currentAmount += 1;
        }else {
            this.products.push({...product, currentAmount:1})
        }

        this.products.push(product);
        this.listSubject.next(this.products);
    }

    private calcTotal(): void{
        const total = this.products.reduce((acc,prod) => (acc+=prod.price) * prod.currentAmount,0);
        this.totalSubject.next(total);
    }

}









