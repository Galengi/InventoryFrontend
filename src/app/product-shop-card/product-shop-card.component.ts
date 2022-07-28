import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, ProductModel } from '../models/product';
import { ShoppingList, ShoppingLst } from '../models/shopping-list';

@Component({
  selector: 'app-product-shop-card',
  templateUrl: './product-shop-card.component.html',
  styleUrls: ['./product-shop-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShopCardComponent implements OnInit {
  public myImage: string = "";
  public product!:ProductModel;
  public total: number = 0;

  @Input() shopList!:ShoppingList;
  @Output() opEdit = new EventEmitter<ProductModel>();
  @Output() opDelete = new EventEmitter<ProductModel>();
  @Output() opIncrementShop = new EventEmitter<ShoppingList>();
  @Output() opDecrementShop = new EventEmitter<ShoppingList>();
  @Output() opShopList = new EventEmitter<ProductModel>();

  constructor() { }

  ngOnInit(): void {
    this.product = this.shopList.productRequest!;
    this.total = Number(this.product.price.toString().replace(' ', '').replace('.', '').replace(',', '.')) * Number(this.shopList.amount);
    this.total = Number(this.total.toFixed(2));

    this.myImage = "data:image/jpeg;base64," + this.product.image;
  }

  onEdit(): void{
    this.opEdit.emit(this.product);
  }
  onDelete(): void{
    this.opDelete.emit(this.product);
  }
  
  onIncrement(): void{
    this.opIncrementShop.emit(this.shopList);
  }
  onDecrement(): void{
    this.opDecrementShop.emit(this.shopList);
  }
  onAddToList():void{
    this.opShopList.emit(this.product);
  }

}
