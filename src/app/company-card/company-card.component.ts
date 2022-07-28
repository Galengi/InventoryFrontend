import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from '../models/company';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
  @Input() company!:Company;
  @Output() opEdit = new EventEmitter<Company>();
  @Output() opDelete = new EventEmitter<Company>();

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(): void{
    this.opEdit.emit(this.company);
  }
  onDelete(): void{
    this.opDelete.emit(this.company);
  }

}
