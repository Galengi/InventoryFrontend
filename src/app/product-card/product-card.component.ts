import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, ProductModel } from '../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
  public myImage: string = "";
  @Input() product!:ProductModel;
  @Output() opEdit = new EventEmitter<ProductModel>();
  @Output() opDelete = new EventEmitter<ProductModel>();
  @Output() opIncrement = new EventEmitter<ProductModel>();
  @Output() opDecrement = new EventEmitter<ProductModel>();
  @Output() opShopList = new EventEmitter<ProductModel>();

  constructor() { }

  ngOnInit(): void {
    this.myImage = "data:image/jpeg;base64," + this.product.image;
  }

  onEdit(): void{
    this.opEdit.emit(this.product);
  }
  onDelete(): void{
    this.opDelete.emit(this.product);
  }
  
  onIncrement(): void{
    this.opIncrement.emit(this.product);
  }
  onDecrement(): void{
    this.opDecrement.emit(this.product);
  }
  onAddToList():void{
    this.opShopList.emit(this.product);
  }

}
