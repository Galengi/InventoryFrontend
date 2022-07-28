import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from '../models/tag';

@Component({
  selector: 'app-tag-card',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss']
})
export class TagCardComponent implements OnInit {
  @Input() tag!:Tag;
  @Output() opEdit = new EventEmitter<Tag>();
  @Output() opDelete = new EventEmitter<Tag>();

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(): void{
    this.opEdit.emit(this.tag);
  }
  onDelete(): void{
    this.opDelete.emit(this.tag);
  }

}
