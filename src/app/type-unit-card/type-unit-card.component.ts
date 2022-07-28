import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypeUnit } from '../models/type-unit';

@Component({
  selector: 'app-type-unit-card',
  templateUrl: './type-unit-card.component.html',
  styleUrls: ['./type-unit-card.component.scss']
})
export class TypeUnitCardComponent implements OnInit {
  @Input() typeUnit!:TypeUnit;
  @Output() opEdit = new EventEmitter<TypeUnit>();
  @Output() opDelete = new EventEmitter<TypeUnit>();

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(): void{
    this.opEdit.emit(this.typeUnit);
  }
  onDelete(): void{
    this.opDelete.emit(this.typeUnit);
  }

}
